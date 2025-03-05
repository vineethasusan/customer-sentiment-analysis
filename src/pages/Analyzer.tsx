
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart2, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

// Mock sentiment analysis function (in a real app, this would call an API)
const analyzeSentiment = (text: string): Promise<{
  sentiment: "positive" | "neutral" | "negative";
  score: number;
  keywords: Array<{ word: string; sentiment: "positive" | "neutral" | "negative" }>;
}> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Simple sentiment analysis based on keywords
      const positiveWords = ["great", "excellent", "good", "love", "perfect", "amazing", "helpful", "satisfied"];
      const negativeWords = ["bad", "poor", "terrible", "hate", "awful", "disappointed", "frustrated", "useless"];
      
      const words = text.toLowerCase().split(/\s+/);
      let positiveCount = 0;
      let negativeCount = 0;
      
      words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) negativeCount++;
      });
      
      let sentiment: "positive" | "neutral" | "negative" = "neutral";
      let score = 0.5;
      
      if (positiveCount > negativeCount) {
        sentiment = "positive";
        score = 0.5 + (positiveCount / (positiveCount + negativeCount + 1)) * 0.5;
      } else if (negativeCount > positiveCount) {
        sentiment = "negative";
        score = 0.5 - (negativeCount / (positiveCount + negativeCount + 1)) * 0.5;
      }
      
      // Extract keywords
      const keywords = words
        .filter(word => positiveWords.includes(word) || negativeWords.includes(word))
        .map(word => ({
          word,
          sentiment: positiveWords.includes(word) ? "positive" : "negative" as "positive" | "neutral" | "negative"
        }))
        .slice(0, 5); // Top 5 keywords
      
      resolve({ sentiment, score, keywords });
    }, 1500); // 1.5 seconds delay to simulate API call
  });
};

const Analyzer = () => {
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    sentiment: "positive" | "neutral" | "negative";
    score: number;
    keywords: Array<{ word: string; sentiment: "positive" | "neutral" | "negative" }>;
  } | null>(null);
  const [recentAnalyses, setRecentAnalyses] = useState<Array<{
    id: number;
    text: string;
    sentiment: "positive" | "neutral" | "negative";
    score: number;
    timestamp: Date;
  }>>([]);

  const handleAnalyze = async () => {
    if (!reviewText.trim()) {
      toast({
        title: "Empty review",
        description: "Please enter a review to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const sentimentResult = await analyzeSentiment(reviewText);
      setResult(sentimentResult);
      
      // Add to recent analyses
      setRecentAnalyses(prev => [
        {
          id: Date.now(),
          text: reviewText,
          sentiment: sentimentResult.sentiment,
          score: sentimentResult.score,
          timestamp: new Date()
        },
        ...prev.slice(0, 4) // Keep only 5 recent analyses
      ]);
      
      toast({
        title: "Analysis complete",
        description: `Review sentiment: ${sentimentResult.sentiment}`,
      });
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      toast({
        title: "Analysis failed",
        description: "Sorry, we couldn't analyze your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment: "positive" | "neutral" | "negative") => {
    switch (sentiment) {
      case "positive":
        return "#34D399"; // green
      case "neutral":
        return "#60A5FA"; // blue
      case "negative":
        return "#F87171"; // red
      default:
        return "#60A5FA"; // blue
    }
  };

  const getSentimentBadge = (sentiment: "positive" | "neutral" | "negative") => {
    switch (sentiment) {
      case "positive":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Positive
          </Badge>
        );
      case "neutral":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Neutral
          </Badge>
        );
      case "negative":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Negative
          </Badge>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sentiment Analyzer</h1>
        <p className="text-muted-foreground mt-2">
          Analyze the sentiment of customer reviews in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 animate-fade-in">
          <CardHeader>
            <CardTitle>Analyze a Review</CardTitle>
            <CardDescription>
              Enter a product review to analyze its sentiment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter a product review here... (e.g. 'I love this product, it's amazing!')"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="min-h-32 resize-none"
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={loading || !reviewText.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Sentiment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {result && (
              <motion.div 
                className="mt-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Analysis Result</h3>
                  {getSentimentBadge(result.sentiment)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Negative</span>
                    <span>Neutral</span>
                    <span>Positive</span>
                  </div>
                  <div className="relative h-2 w-full bg-gray-200 rounded-full">
                    <div 
                      className="absolute h-4 w-4 rounded-full bg-white border-2 transform -translate-y-1/4"
                      style={{ 
                        left: `${result.score * 100}%`, 
                        borderColor: getSentimentColor(result.sentiment)
                      }}
                    />
                  </div>
                  <div className="text-sm text-center mt-1">
                    Sentiment Score: {Math.round(result.score * 100)}%
                  </div>
                </div>
                
                {result.keywords.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Key Sentiment Words</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((keyword, index) => (
                        <Badge 
                          key={index}
                          className={`
                            ${keyword.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                              keyword.sentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                              'bg-blue-100 text-blue-800'}
                          `}
                        >
                          {keyword.word}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
            <CardDescription>
              Your most recent sentiment analyses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentAnalyses.length > 0 ? (
              <div className="space-y-4">
                {recentAnalyses.map((analysis) => (
                  <div key={analysis.id} className="p-3 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      {getSentimentBadge(analysis.sentiment)}
                      <span className="text-xs text-muted-foreground">
                        {analysis.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm mb-2 line-clamp-2">{analysis.text}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Score:
                      </span>
                      <Progress
                        value={analysis.score * 100}
                        className="h-1.5 w-24"
                        indicatorClassName={`bg-${
                          analysis.sentiment === "positive"
                            ? "green-500"
                            : analysis.sentiment === "neutral"
                            ? "blue-500"
                            : "red-500"
                        }`}
                      />
                      <span className="text-xs font-medium">
                        {Math.round(analysis.score * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <BarChart2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  No analyses yet. Try analyzing a review!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 animate-fade-in">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>
            Understanding our sentiment analysis process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-700 font-bold">1</span>
              </div>
              <h3 className="font-semibold">Input</h3>
              <p className="text-sm text-muted-foreground">
                Enter any customer review or feedback text into the analyzer
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-700 font-bold">2</span>
              </div>
              <h3 className="font-semibold">Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Our algorithm identifies sentiment indicators and key phrases
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-700 font-bold">3</span>
              </div>
              <h3 className="font-semibold">Results</h3>
              <p className="text-sm text-muted-foreground">
                Get instant sentiment classification and key insights from the text
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analyzer;
