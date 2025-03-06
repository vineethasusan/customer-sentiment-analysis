
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart2, LineChart, Upload, Loader2, FileText, Check, Info, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { validateCSV, extractTimeSeriesData } from "@/utils/csvValidator";

// Mock data for visualization example
const mockTimeSeriesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  values: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 78],
  forecast: [78, 82, 85, 89, 91, 95],
  forecastLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
};

// Types for our application
type TimeSeriesData = {
  labels: string[];
  values: number[];
  forecast?: number[];
  forecastLabels?: string[];
};

type DatasetInfo = {
  name: string;
  description: string;
  rows: number;
  columns: number;
  timeRange: string;
  dataType: string;
  uploadDate: Date;
};

const Analyzer = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [csvContent, setCsvContent] = useState("");
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData | null>(null);
  const [selectedModel, setSelectedModel] = useState("auto");
  const [forecasting, setForecasting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [csvPreview, setCsvPreview] = useState<string | null>(null);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset previous errors
    setValidationErrors([]);

    // Check file type
    if (file.type !== "text/csv" && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        
        // Read file content
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setCsvContent(content);
          
          // Set a preview of the CSV for the user to see
          const lines = content.split('\n');
          const preview = lines.slice(0, Math.min(5, lines.length)).join('\n');
          setCsvPreview(preview);
          
          // Validate the CSV
          const validationResult = validateCSV(content);
          
          if (validationResult.isValid && validationResult.data) {
            // Extract time series data
            const extractedData = extractTimeSeriesData(validationResult);
            
            if (extractedData) {
              // Generate dataset info
              const mockInfo: DatasetInfo = {
                name: file.name,
                description: `Time series dataset with ${validationResult.data.valueColumns.length} value column(s)`,
                rows: validationResult.data.rows.length,
                columns: validationResult.data.headers.length,
                timeRange: `${extractedData.labels[0]} - ${extractedData.labels[extractedData.labels.length - 1]}`,
                dataType: "Numeric, Time Series",
                uploadDate: new Date()
              };
              
              setDatasetInfo(mockInfo);
              
              // Set time series data for visualization
              setTimeSeriesData({
                labels: extractedData.labels,
                values: extractedData.values,
                forecast: mockTimeSeriesData.forecast,
                forecastLabels: mockTimeSeriesData.forecastLabels
              });
              
              // Complete upload
              setTimeout(() => {
                setIsUploading(false);
                setActiveTab("visualize");
                toast({
                  title: "Upload successful",
                  description: `File "${file.name}" has been uploaded and validated.`,
                });
              }, 500);
            } else {
              handleValidationError(["Could not extract time series data from the CSV file."]);
            }
          } else {
            handleValidationError(validationResult.errors);
          }
        };
        
        reader.readAsText(file);
      }
    }, 200);
  };

  // Handle validation errors
  const handleValidationError = (errors: string[]) => {
    setValidationErrors(errors);
    setIsUploading(false);
    toast({
      title: "Validation Error",
      description: "The CSV file has validation issues. Please check the details below.",
      variant: "destructive",
    });
  };

  // Handle sample data generation
  const handleUseSampleData = () => {
    // Reset previous errors
    setValidationErrors([]);
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        
        // Generate sample CSV content
        const sampleCsv = "date,value\n2023-01,65\n2023-02,59\n2023-03,80\n2023-04,81\n2023-05,56\n2023-06,55\n2023-07,40\n2023-08,45\n2023-09,60\n2023-10,70\n2023-11,75\n2023-12,78";
        setCsvContent(sampleCsv);
        setCsvPreview(sampleCsv);
        
        // Set mock dataset info
        const mockInfo: DatasetInfo = {
          name: "sample_sales_data.csv",
          description: "Monthly sales data from 2023",
          rows: 12,
          columns: 2,
          timeRange: "Jan 2023 - Dec 2023",
          dataType: "Numeric, Time Series",
          uploadDate: new Date()
        };
        
        setDatasetInfo(mockInfo);
        
        // Set mock time series data for visualization
        setTimeSeriesData(mockTimeSeriesData);
        
        // Complete process
        setTimeout(() => {
          setIsUploading(false);
          setActiveTab("visualize");
          toast({
            title: "Sample data loaded",
            description: "Sample time series data has been loaded successfully.",
          });
        }, 500);
      }
    }, 100);
  };

  // Handle forecast generation
  const handleGenerateForecast = () => {
    if (!timeSeriesData) return;
    
    setForecasting(true);
    
    // Simulate forecast generation
    setTimeout(() => {
      // Already have mock forecast data in our timeSeriesData
      setActiveTab("forecast");
      setForecasting(false);
      toast({
        title: "Forecast generated",
        description: `Forecast successfully generated using ${selectedModel === 'auto' ? 'Auto-selected' : selectedModel} model.`,
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">PredictAI Analyzer</h1>
        <p className="text-muted-foreground mt-2">
          Upload time series data, visualize trends, and generate forecasts
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="upload" disabled={isUploading}>
            <Upload className="mr-2 h-4 w-4" />
            Data Upload
          </TabsTrigger>
          <TabsTrigger value="visualize" disabled={!timeSeriesData || isUploading}>
            <BarChart2 className="mr-2 h-4 w-4" />
            Visualization
          </TabsTrigger>
          <TabsTrigger value="forecast" disabled={!timeSeriesData || isUploading}>
            <LineChart className="mr-2 h-4 w-4" />
            Forecast
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Upload Time Series Data</CardTitle>
                <CardDescription>
                  Upload a CSV file containing your time series data
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isUploading ? (
                  <div className="space-y-6">
                    {validationErrors.length > 0 && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Validation Errors</AlertTitle>
                        <AlertDescription>
                          <ul className="list-disc pl-4 mt-2 space-y-1">
                            {validationErrors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {csvPreview && (
                      <div className="border rounded-md p-4 bg-muted/30">
                        <h3 className="text-sm font-medium mb-2">CSV Preview:</h3>
                        <pre className="text-xs overflow-x-auto whitespace-pre-wrap">{csvPreview}</pre>
                      </div>
                    )}
                  
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Drop your CSV file here or click to browse</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Supports CSV files with time series data. File must include a date/time column and at least one numeric value column.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={() => document.getElementById('file-upload')?.click()}>
                          <Upload className="mr-2 h-4 w-4" /> Upload CSV File
                        </Button>
                        <input
                          id="file-upload"
                          type="file"
                          accept=".csv"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        <Button variant="outline" onClick={handleUseSampleData}>
                          <FileText className="mr-2 h-4 w-4" /> Use Sample Data
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin mb-4" />
                    <h3 className="text-lg font-medium mb-4">Processing your data...</h3>
                    <Progress value={uploadProgress} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CSV Format Requirements</CardTitle>
                <CardDescription>
                  How to prepare your data for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Required Columns
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your CSV must include:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc pl-6 space-y-1">
                    <li>A date/time column (e.g., "date", "time", "month", "year")</li>
                    <li>At least one numeric value column</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Date Format
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Date columns should follow one of these formats:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc pl-6 space-y-1">
                    <li>YYYY-MM-DD (e.g., 2023-12-31)</li>
                    <li>MM/DD/YYYY (e.g., 12/31/2023)</li>
                    <li>Month abbreviations (e.g., Jan, Feb, Mar)</li>
                    <li>Year-Month (e.g., 2023-01, 2023-02)</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Value Format
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Numeric values:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc pl-6 space-y-1">
                    <li>Must be plain numbers (e.g., 123, 45.67)</li>
                    <li>Should not include currency symbols or other special characters</li>
                    <li>Use a period (.) as the decimal separator</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-3 bg-blue-50">
                  <h3 className="text-sm font-medium text-blue-700 mb-2">Example Format:</h3>
                  <pre className="text-xs text-blue-700 whitespace-pre-wrap">
date,sales
2023-01,1245.50
2023-02,1100.75
2023-03,1350.25
                  </pre>
                </div>
                
                <div className="p-3 bg-amber-50 rounded-md flex items-start mt-4">
                  <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700">
                    For best results, ensure your data does not contain missing values or inconsistent formatting.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visualize">
          {timeSeriesData && datasetInfo && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Time Series Visualization</CardTitle>
                    <CardDescription>
                      Visual representation of your uploaded data
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {datasetInfo.rows} data points
                  </Badge>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-[300px] w-full bg-gray-50 rounded-md flex items-center justify-center mb-4">
                    {/* This would be replaced with an actual chart component */}
                    <div className="relative w-full h-full p-4">
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200"></div>
                      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200"></div>
                      
                      {/* Simple visualization of time series data */}
                      <div className="relative h-full w-full flex items-end">
                        {timeSeriesData.values.map((value, index) => (
                          <div 
                            key={index} 
                            className="flex-1 mx-[1px] bg-primary/80 hover:bg-primary transition-colors"
                            style={{ height: `${(value / 100) * 80}%` }}
                            title={`${timeSeriesData.labels[index]}: ${value}`}
                          ></div>
                        ))}
                      </div>
                      
                      {/* X-axis labels */}
                      <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between px-2">
                        <span className="text-xs text-muted-foreground">{timeSeriesData.labels[0]}</span>
                        <span className="text-xs text-muted-foreground">{timeSeriesData.labels[timeSeriesData.labels.length - 1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Dataset: {datasetInfo.name}</p>
                      <p className="text-xs text-muted-foreground">Time Range: {datasetInfo.timeRange}</p>
                    </div>
                    <Button onClick={handleGenerateForecast}>
                      Generate Forecast
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dataset Information</CardTitle>
                  <CardDescription>
                    Summary of your uploaded time series data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">File Name</p>
                      <p className="font-medium">{datasetInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Upload Date</p>
                      <p className="font-medium">{datasetInfo.uploadDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rows</p>
                      <p className="font-medium">{datasetInfo.rows}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Columns</p>
                      <p className="font-medium">{datasetInfo.columns}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time Range</p>
                      <p className="font-medium">{datasetInfo.timeRange}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data Type</p>
                      <p className="font-medium">{datasetInfo.dataType}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Select Forecasting Model</p>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                    >
                      <option value="auto">Auto-select (Recommended)</option>
                      <option value="arima">ARIMA</option>
                      <option value="prophet">Prophet</option>
                      <option value="lstm">LSTM (Deep Learning)</option>
                      <option value="xgboost">XGBoost</option>
                    </select>
                    <p className="text-xs text-muted-foreground mt-2">
                      Auto-select analyzes your data and chooses the best model automatically.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="forecast">
          {timeSeriesData && datasetInfo && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Forecast Results</CardTitle>
                    <CardDescription>
                      Forecasted values for the next 6 months
                    </CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {selectedModel === 'auto' ? 'Auto-selected' : selectedModel} Model
                  </Badge>
                </CardHeader>
                <CardContent className="pt-6">
                  {forecasting ? (
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="h-[300px] w-full bg-gray-50 rounded-md flex items-center justify-center mb-4">
                        {/* This would be replaced with an actual forecast chart component */}
                        <div className="relative w-full h-full p-4">
                          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200"></div>
                          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200"></div>
                          
                          {/* Simple visualization of time series data */}
                          <div className="relative h-full w-full flex items-end">
                            {/* Historical data */}
                            {timeSeriesData.values.map((value, index) => (
                              <div 
                                key={`hist-${index}`} 
                                className="flex-1 mx-[1px] bg-primary/80"
                                style={{ height: `${(value / 100) * 80}%` }}
                                title={`${timeSeriesData.labels[index]}: ${value}`}
                              ></div>
                            ))}
                            
                            {/* Forecast data */}
                            {timeSeriesData.forecast?.map((value, index) => (
                              <div 
                                key={`forecast-${index}`}
                                className="flex-1 mx-[1px] bg-blue-300 border-2 border-dashed border-blue-500"
                                style={{ height: `${(value / 100) * 80}%` }}
                                title={`${timeSeriesData.forecastLabels?.[index]}: ${value} (Forecast)`}
                              ></div>
                            ))}
                          </div>
                          
                          {/* Legend */}
                          <div className="absolute top-2 right-2 flex items-center space-x-4">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-primary mr-1"></div>
                              <span className="text-xs">Historical</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-300 border border-dashed border-blue-500 mr-1"></div>
                              <span className="text-xs">Forecast</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <h3 className="text-sm font-medium mb-2">Forecast Accuracy</h3>
                              <div className="flex items-center">
                                <Progress value={85} className="h-2 flex-1 mr-2" />
                                <span className="text-sm font-medium">85%</span>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <h3 className="text-sm font-medium mb-2">Error Rate (RMSE)</h3>
                              <p className="text-2xl font-bold">4.23</p>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <Button>
                          Export Forecast Results
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Forecast Details</CardTitle>
                  <CardDescription>
                    Predicted values for future periods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {forecasting ? (
                    <div className="h-[200px] flex items-center justify-center">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted">
                            <tr>
                              <th className="p-2 text-left">Period</th>
                              <th className="p-2 text-right">Forecast</th>
                              <th className="p-2 text-right">Confidence</th>
                            </tr>
                          </thead>
                          <tbody>
                            {timeSeriesData.forecastLabels?.map((label, index) => (
                              <tr key={index} className="border-t">
                                <td className="p-2">{label}</td>
                                <td className="p-2 text-right font-medium">{timeSeriesData.forecast?.[index]}</td>
                                <td className="p-2 text-right">±2.1</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="p-3 bg-blue-50 rounded-md flex items-start">
                        <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-700">
                          <p className="font-medium mb-1">Forecast Interpretation</p>
                          <p>The model indicates an upward trend with seasonal variations. Peak values are predicted in May.</p>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full" onClick={() => setActiveTab("visualize")}>
                        Modify Model Parameters
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How PredictAI Works</CardTitle>
          <CardDescription>
            Our forecasting process explained
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">1. Upload Data</h3>
              <p className="text-sm text-muted-foreground">
                Upload your time series data in CSV format. We automatically process and prepare it for analysis.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">2. Visualize & Analyze</h3>
              <p className="text-sm text-muted-foreground">
                Explore your data with interactive charts. Our AI analyzes patterns, trends, and seasonality.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <LineChart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">3. Generate Forecasts</h3>
              <p className="text-sm text-muted-foreground">
                Our ML models predict future values with high accuracy. Export results for use in your business.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analyzer;
