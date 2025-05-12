const OPENROUTER_API_KEY = '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';
const MODEL = 'google/gemini-2.5-flash-preview:thinking';

interface AnalysisResult {
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
}

export const aiService = {
  analyzeText: async (text: string): Promise<string> => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'UCP Calculator'
        },
        body: JSON.stringify({
          model: MODEL,
          temperature: 0.7,
          frequency_penalty: 0.5,
          messages: [
            {
              role: 'user',
              content: `Analyze this text and extract UCP (Use Case Points) values. 
              Extract both UAW (Unadjusted Actor Weight) and UUCW (Unadjusted Use Case Weight) values.
              
              Format the response as JSON with the following structure:
              {
                "uaw": {
                  "simple": number,
                  "average": number,
                  "complex": number
                },
                "uucw": {
                  "simple": number,
                  "average": number,
                  "complex": number
                }
              }
              
              Also provide an explanation of what these values mean.
              
              Here's the text to analyze: ${text}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      throw error;
    }
  },
  analyzeImage: async (image: File): Promise<string> => {
    try {
      const base64Image = await fileToBase64(image);
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'UCP Calculator'
        },
        body: JSON.stringify({
          model: MODEL,
          temperature: 0.7,
          frequency_penalty: 0.5,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Analyze this image and extract UCP (Use Case Points) values. 
                  Extract both UAW (Unadjusted Actor Weight) and UUCW (Unadjusted Use Case Weight) values.
                  
                  Format part of your response as JSON with the following structure:
                  {
                    "uaw": {
                      "simple": number,
                      "average": number,
                      "complex": number
                    },
                    "uucw": {
                      "simple": number,
                      "average": number,
                      "complex": number
                    }
                  }
                  
                  Also provide an explanation of what these values mean.`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: base64Image
                  }
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      throw error;
    }
  },

  /**
   * Parses the analysis results from the API response
   */
  parseAnalysisFromText: (text: string): AnalysisResult | null => {
    try {
      // Try to find a JSON structure in the response
      const jsonMatch = text.match(/```json([\s\S]*?)```|{[\s\S]*?}/);
      if (jsonMatch && jsonMatch[0]) {
        let jsonStr = jsonMatch[0];
        if (jsonStr.startsWith('```json')) {
          jsonStr = jsonStr.replace(/```json|```/g, '');
        }
        return JSON.parse(jsonStr);
      }
      return null;
    } catch (error) {
      console.error('Failed to parse JSON from text:', error);
      return null;
    }
  }
};

/**
 * Converts a file to a base64 data URL
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
} 