import React, { useState } from 'react';
import { Calculator } from './components/Calculator';
export function App() {
  return <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">UCP Calculator</h1>
          <p className="text-sm">Use Case Points, TCF & EF Estimation Tool</p>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6">
        <Calculator />
      </main>
      <footer className="bg-gray-100 border-t p-4 text-center text-gray-600 text-sm">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} UCP Calculator Tool
        </div>
      </footer>
    </div>;
}