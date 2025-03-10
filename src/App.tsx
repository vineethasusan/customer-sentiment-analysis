
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Analyzer from "./pages/Analyzer";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import SecureConnect from "./pages/SecureConnect";
import MentorFinder from "./pages/MentorFinder";
import RegularServices from "./pages/RegularServices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/analyzer" element={<Layout><Analyzer /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/secure-connect" element={<Layout><SecureConnect /></Layout>} />
          <Route path="/mentor-finder" element={<Layout><MentorFinder /></Layout>} />
          <Route path="/find-mentors" element={<Layout><MentorFinder /></Layout>} />
          <Route path="/regular-services" element={<Layout><RegularServices /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
