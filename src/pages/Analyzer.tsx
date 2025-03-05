
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, AlertTriangle, ThumbsUp, BarChart2 } from "lucide-react";

// Mock analysis function
const mockAnalyzeSentiment = (text: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple sentiment analysis logic (for demo purposes)
      const lowercaseText = text.toLowerCase();
      const words = lowercaseText.split(/\s+/);
      
      const positiveWords = ["good", "great", "excellent", "amazing", "love", "perfect", "happy", "satisfied", "best", "recommended"];
      const negativeWords = ["bad", "terrible", "horrible", "poor", "disappointed", "waste", "worst", "awful", "hate", "problem"];
      
      let positiveCount = 0;
      let negativeCount = 0;
      
      words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) negativeCount++;
      });
      
      const totalWords = words.length;
      const neutralCount = totalWords - positiveCount - negativeCount;
      
      let sentiment = "neutral";
      let score = 0.5;
      
      if (positiveCount > negativeCount) {
        sentiment = "positive";
        score = 0.5 + (positiveCount / totalWords) * 0.5;
      } else if (negativeCount > positiveCount) {
        sentiment = "negative";
        score = 0.5 - (negativeCount / totalWords) * 0.5;
      }
      
      // Extract top keywords (simple implementation for demo)
      const wordFreq: Record<string, number> = {};
      words.forEach(word => {
        if (word.length > 3) { // Only count words longer than 3 chars
          wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
      });
      
      const keywords = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word, count]) => ({
          word,
          count,
          sentiment: positiveWords.includes(word) 
            ? "positive" 
            : negativeWords.includes(word) 
              ? "negative" 
              : "neutral"
        }));
      
      resolve({
        sentiment,
        score,
        analysis: {
          positive: {
            count: positiveCount,
            percentage: Math.round((positiveCount / totalWords) * 100)
          },
          neutral: {
            count: neutralCount,
            percentage: Math.round((neutralCount / totalWords) * 100)
          },
          negative: {
            count: negativeCount,
            percentage: Math.round((negativeCount / totalWords) * 100)
          }
        },
        keywords
      });
    }, 1500); // Simulate API delay
  });
};

const exampleReviews = [
  "The product exceeded all my expectations. The quality is outstanding and the customer service was incredibly helpful when I had questions.",
  "Decent product overall, but the delivery took longer than expected. The packaging was nice though.",
  "I'm extremely disappointed with my purchase. The item arrived damaged and customer service has been unresponsive to my complaints."
];

const Analyzer = () => {
  const { toast } = useToast();
  const [reviewText, setReviewText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleAnalyze = async () => {
    if (!reviewText.trim()) {
      toast({
        title: "Empty review",
        description: "Please enter a review to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const result = await mockAnalyzeSentiment(reviewText);
      setAnalysisResult(result);
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the review",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = () => {
    setFileUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setFileUploading(false);
          toast({
            title: "Upload complete",
            description: "Your file has been uploaded successfully",
          });
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const handleExampleClick = (example: string) => {
    setReviewText(example);
  };

  const getSentimentIcon = () => {
    if (!analysisResult) return null;
    
    switch (analysisResult.sentiment) {
      case "positive":
        return <ThumbsUp className="w-12 h-12 text-green-500" />;
      case "negative":
        return <AlertTriangle className="w-12 h-12 text-red-500" />;
      default:
        return <BarChart2 className="w-12 h-12 text-blue-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500";
      case "neutral":
        return "bg-blue-500";
      case "negative":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSentimentBadge = (sentiment: string) => {
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
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Sentiment Analyzer</h1>
        <p className="text-muted-foreground mb-8">
          Analyze customer reviews to determine sentiment and extract valuable insights
        </p>

        <Tabs defaultValue="analyze" className="w-full">
          <TabsList className="w-full max-w-md mb-6">
            <TabsTrigger value="analyze" className="flex-1">Analyze Text</TabsTrigger>
            <TabsTrigger value="upload" className="flex-1">Upload File</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analyze" className="mt-0">
            <Card className="mb-6 card-glass">
              <CardHeader>
                <CardTitle>Analyze Customer Review</CardTitle>
                <CardDescription>
                  Enter a review text to analyze its sentiment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="review">Review Text</Label>
                    <Textarea
                      id="review"
                      placeholder="Enter the customer review text here..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="min-h-[150px] mt-2"
                    />
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      <Button 
                        onClick={handleAnalyze} 
                        disabled={isAnalyzing || !reviewText.trim()}
                        className="w-full"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze Sentiment"
                        )}
                      </Button>
                    </div>
                    <div className="flex-1">
                      <Button 
                        variant="outline" 
                        onClick={() => setReviewText("")}
                        disabled={isAnalyzing || !reviewText.trim()}
                        className="w-full"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-2">Try these examples:</h3>
              <div className="flex flex-col gap-2">
                {exampleReviews.map((review, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto text-left p-3"
                    onClick={() => handleExampleClick(review)}
                  >
                    <span className="text-xs font-normal line-clamp-1">
                      {review}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
            
            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="card-glass">
                  <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                    <CardDescription>
                      Sentiment analysis of the provided review
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-4">
                          {getSentimentIcon()}
                        </div>
                        <h3 className="text-2xl font-bold mb-2 capitalize">
                          {analysisResult.sentiment} Sentiment
                        </h3>
                        <div className="w-full max-w-xs">
                          <div className="h-4 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className={`h-full ${getSentimentColor(analysisResult.sentiment)}`}
                              style={{ width: `${analysisResult.score * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                            <span>Negative</span>
                            <span>Neutral</span>
                            <span>Positive</span>
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-center text-muted-foreground">
                          Confidence Score: {(analysisResult.score * 100).toFixed(0)}%
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Positive Elements</span>
                              <span>{analysisResult.analysis.positive.percentage}%</span>
                            </div>
                            <Progress 
                              value={analysisResult.analysis.positive.percentage} 
                              className="h-2"
                              indicatorClassName="bg-sentiment-positive" 
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {analysisResult.analysis.positive.count} positive elements detected
                            </p>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Neutral Elements</span>
                              <span>{analysisResult.analysis.neutral.percentage}%</span>
                            </div>
                            <Progress 
                              value={analysisResult.analysis.neutral.percentage} 
                              className="h-2"
                              indicatorClassName="bg-sentiment-neutral"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {analysisResult.analysis.neutral.count} neutral elements detected
                            </p>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Negative Elements</span>
                              <span>{analysisResult.analysis.negative.percentage}%</span>
                            </div>
                            <Progress 
                              value={analysisResult.analysis.negative.percentage} 
                              className="h-2"
                              indicatorClassName="bg-sentiment-negative"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {analysisResult.analysis.negative.count} negative elements detected
                            </p>
                          </div>
                        </div>
                        
                        {analysisResult.keywords.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-3">Key Phrases</h4>
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.keywords.map((keyword: any, index: number) => (
                                <div key={index} className="flex items-center gap-2 border rounded-lg px-3 py-1.5">
                                  <span className="text-sm">{keyword.word}</span>
                                  {getSentimentBadge(keyword.sentiment)}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>
          
          <TabsContent value="upload" className="mt-0">
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Upload Reviews File</CardTitle>
                <CardDescription>
                  Upload a CSV or Excel file containing customer reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-muted rounded-lg p-10 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Drag and drop your file</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Support for CSV, XLSX, or TXT files
                    </p>
                    <Button onClick={handleFileUpload} disabled={fileUploading}>
                      {fileUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Select File"
                      )}
                    </Button>
                  </div>
                  
                  {fileUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Uploading file...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">File Requirements:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                      <li>File should contain a column with review text</li>
                      <li>Maximum file size: 10MB</li>
                      <li>Supported formats: CSV, XLSX, TXT</li>
                      <li>For CSV files, ensure reviews are properly comma-separated</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analyzer;
