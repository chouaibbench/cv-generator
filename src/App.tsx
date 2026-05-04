import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CVData, initialCVData } from './types/cv';
import CVEditor from './components/CVEditor';
import CVPreview from './components/CVPreview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Languages, Palette, Layout, Eye, Edit3, Github } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { loadFromLocalStorage, saveToLocalStorage } from './services/cvService';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'motion/react';
import './lib/i18n';

export default function App() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<CVData>(initialCVData);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) {
      setData(saved);
      i18n.changeLanguage(saved.language);
    }
  }, [i18n]);

  const handleDataChange = (newData: CVData) => {
    setData(newData);
    saveToLocalStorage(newData);
  };

  const toggleLanguage = () => {
    const newLang = data.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    handleDataChange({ ...data, language: newLang });
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('cv-preview-container');
    if (!element) return;

    setIsExporting(true);
    try {
      // html2canvas works best when the element is at its natural scale
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution for professional look
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 800 // Ensure it captures at 800px width
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2, undefined, 'FAST');
      pdf.save(`CV_${data.personalInfo.fullName.replace(/\s+/g, '_') || 'EliteCV'}.pdf`);
    } catch (error) {
      console.error('PDF export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const themeColors = [
    { name: 'Classic Black', value: '#1a1a1a' },
    { name: 'Royal Blue', value: '#2563eb' },
    { name: 'Emerald', value: '#059669' },
    { name: 'Deep Purple', value: '#7c3aed' },
    { name: 'Crimson', value: '#dc2626' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold italic">EC</div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter leading-none">{t('app.title')}</h1>
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">{t('app.subtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Palette className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>{t('preview.themeColor')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {themeColors.map((color) => (
                  <DropdownMenuItem key={color.value} onClick={() => handleDataChange({ ...data, themeColor: color.value })}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color.value }} />
                      <span>{color.name}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Layout className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>{t('preview.templates')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDataChange({ ...data, template: 'minimal' })} className={data.template === 'minimal' ? 'bg-secondary' : ''}>
                  Minimalist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDataChange({ ...data, template: 'modern' })} className={data.template === 'modern' ? 'bg-secondary' : ''}>
                  Professional Modern
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDataChange({ ...data, template: 'sidebar' })} className={data.template === 'sidebar' ? 'bg-secondary' : ''}>
                  Elegant Sidebar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" onClick={toggleLanguage} className="gap-2 rounded-full px-4">
              <Languages className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{data.language.toUpperCase()}</span>
            </Button>

            <Button 
              size="sm" 
              onClick={handleExportPDF} 
              disabled={isExporting}
              className="gap-2 rounded-full px-4 font-bold bg-primary hover:bg-primary/90"
            >
              <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
              {t('preview.downloadPdf')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Editor Side */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold tracking-tighter">{t('app.subtitle')}</h2>
              </div>
              <div className="lg:hidden">
                <Button variant="outline" size="sm" onClick={() => setActiveTab('preview')}>
                  <Eye className="w-4 h-4 mr-2" /> {t('preview.livePreview')}
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              <CVEditor data={data} onChange={handleDataChange} />
            </ScrollArea>
          </div>

          {/* Preview Side */}
          <div className={`fixed lg:sticky inset-0 z-40 lg:z-0 lg:top-24 bg-[#fafafa] lg:bg-transparent flex flex-col gap-6 p-4 lg:p-0 transition-transform duration-300 ${activeTab === 'preview' ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold tracking-tighter">{t('preview.livePreview')}</h2>
              </div>
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setActiveTab('editor')}>
                Back to Edit
              </Button>
            </div>
            
            <div className="flex-1 flex items-start justify-center overflow-auto bg-secondary/20 rounded-2xl border min-h-[600px] p-8 scrollbar-none relative">
                <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.6] md:scale-[0.8] xl:scale-100">
                  <CVPreview id="cv-preview-container" data={data} />
                </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-white mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 EliteCV — Crafted for professionals.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="https://github.com" className="flex items-center gap-1 hover:text-foreground transition-colors italic font-medium">
              <Github size={14} /> Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
