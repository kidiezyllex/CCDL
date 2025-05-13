const OPENROUTER_API_KEY = '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';
const MODEL = 'openai/gpt-3.5-turbo-0613';

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
          temperature: 0.2,
          frequency_penalty: 0.5,
          messages: [
            {
              role: 'user',
              content: `You must follow these exact steps to analyze the text:

1. IDENTIFY all actors and categorize them as Simple, Average, or Complex. Count each category.
2. IDENTIFY all use cases and categorize them as Simple, Average, or Complex. Count each category.
3. CALCULATE UAW using EXACTLY this formula: UAW = (Simple Actors × 1) + (Average Actors × 2) + (Complex Actors × 3)
4. CALCULATE UUCW using EXACTLY this formula: UUCW = (Simple Use Cases × 5) + (Average Use Cases × 10) + (Complex Use Cases × 15)

You must create valid JSON with the following structure:
{
  "uaw": {
    "simple": [exact count of simple actors],
    "average": [exact count of average actors],
    "complex": [exact count of complex actors],
    "total": [calculated UAW value using the formula]
  },
  "uucw": {
    "simple": [exact count of simple use cases],
    "average": [exact count of average use cases],
    "complex": [exact count of complex use cases],
    "total": [calculated UUCW value using the formula]
  }
}

Show your calculations explicitly underneath the JSON to verify you followed the formulas correctly.

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
          temperature: 0.2,
          frequency_penalty: 0.5,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `You must follow these exact steps to analyze the image:

1. IDENTIFY all actors and categorize them as Simple, Average, or Complex. Count each category.
2. IDENTIFY all use cases and categorize them as Simple, Average, or Complex. Count each category.
3. CALCULATE UAW using EXACTLY this formula: UAW = (Simple Actors × 1) + (Average Actors × 2) + (Complex Actors × 3)
4. CALCULATE UUCW using EXACTLY this formula: UUCW = (Simple Use Cases × 5) + (Average Use Cases × 10) + (Complex Use Cases × 15)

You must create valid JSON with the following structure:
{
  "uaw": {
    "simple": [exact count of simple actors],
    "average": [exact count of average actors],
    "complex": [exact count of complex actors],
    "total": [calculated UAW value using the formula]
  },
  "uucw": {
    "simple": [exact count of simple use cases],
    "average": [exact count of average use cases],
    "complex": [exact count of complex use cases],
    "total": [calculated UUCW value using the formula]
  }
}

Show your calculations explicitly underneath the JSON to verify you followed the formulas correctly.`
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
  parseAnalysisFromText: (text: string): AnalysisResult | null => {
    try {
      const jsonMatch = text.match(/```json([\s\S]*?)```|({[\s\S]*})[^}]*$/);
      if (jsonMatch && jsonMatch[0]) {
        let jsonStr = jsonMatch[1] || jsonMatch[2];
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

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
} 