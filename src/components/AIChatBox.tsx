import React, { useState, useRef } from 'react';
import { aiService } from '../services/aiService';
import { ImageIcon, SendIcon, ClipboardCheck } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  analysis?: {
    uaw?: {
      simple?: number;
      average?: number;
      complex?: number;
    };
    uucw?: {
      simple?: number;
      average?: number;
      complex?: number;
    };
  };
}

interface AIChatBoxProps {
  onInsertValues: (values: {
    uaw?: { simple?: number; average?: number; complex?: number };
    uucw?: { simple?: number; average?: number; complex?: number };
  }) => void;
}

export function AIChatBox({ onInsertValues }: AIChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !imageFile) return;
    const userMessage: Message = {
      role: 'user',
      content: input || 'Analyze this image and extract UCP values.'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    let aiResponseContent: string;
    if (imageFile) {
      aiResponseContent = await aiService.analyzeImage(imageFile);
    } else {
      aiResponseContent = await aiService.analyzeText(input);
    }

    const response = {
      role: 'assistant' as const,
      content: aiResponseContent
    };
    
    setMessages(prev => [...prev, response]);
    setAnalysis(aiService.parseAnalysisFromText(aiResponseContent));
    setIsLoading(false);
    clearImage();
  };

  const handleInsertValues = () => {
    if (analysis) {
      onInsertValues(analysis);
    }
  };

  return (
    <div className="w-full h-[500px] bg-white rounded-lg flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">AI Assistant</h2>
        <p className="text-sm text-gray-600">Chat or upload an image to analyze UCP values</p>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Chat section - Left side */}
        <div className="flex flex-col w-1/2 border-r">
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg max-w-[90%] ${
                    message.role === 'user' 
                      ? 'bg-blue-100 text-blue-900' 
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-center justify-center">
                <div className="text-gray-500 animate-pulse">
                  Processing...
                </div>
              </div>
            )}
          </div>
          
          {/* Image preview area */}
          {imagePreview && (
            <div className="px-4 py-2 border-t">
              <div className="flex items-center">
                <div className="relative w-16 h-16">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="object-cover w-full h-full rounded"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute flex items-center justify-center w-5 h-5 text-white bg-red-500 rounded-full -top-2 -right-2"
                  >
                    ×
                  </button>
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  Image uploaded and ready for analysis
                </span>
              </div>
            </div>
          )}
          
          {/* Input area */}
          <div className="p-4 mt-auto border-t">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message or upload an image..."
                  className="w-full p-2 border rounded-lg resize-none"
                  rows={2}
                  disabled={isLoading}
                />
              </div>
              <button 
                type="button"
                onClick={handleImageUploadClick}
                className="flex items-center justify-center w-10 h-10 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                disabled={isLoading}
              >
                <ImageIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                type="submit"
                className="flex items-center justify-center w-10 h-10 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                disabled={isLoading}
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        {/* Results section - Right side */}
        <div className="flex flex-col w-1/2">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Analysis Results</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {analysis ? (
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-md shadow-sm">
                    <div className="mb-2 font-medium text-gray-800">UAW (Unadjusted Actor Weight):</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Simple:</span>
                        <span className="font-medium">{analysis.uaw?.simple || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average:</span>
                        <span className="font-medium">{analysis.uaw?.average || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Complex:</span>
                        <span className="font-medium">{analysis.uaw?.complex || 0}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white rounded-md shadow-sm">
                    <div className="mb-2 font-medium text-gray-800">UUCW (Unadjusted Use Case Weight):</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Simple:</span>
                        <span className="font-medium">{analysis.uucw?.simple || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average:</span>
                        <span className="font-medium">{analysis.uucw?.average || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Complex:</span>
                        <span className="font-medium">{analysis.uucw?.complex || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
               <div className="flex justify-end w-full">
               <button
                  onClick={handleInsertValues}
                  className="w-fit mt-6 py-2.5 px-4 flex items-center justify-center font-medium text-white rounded-lg 
                  bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                  transition-all duration-200 shadow-md hover:shadow-lg"
                  disabled={isLoading}
                >
                  <ClipboardCheck className="w-5 h-5 mr-2" />
                  Insert Values into Form
                </button>
               </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No analysis results yet. Start a conversation or upload an image to analyze.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 