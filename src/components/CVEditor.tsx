import React from 'react';
import { CVData, WorkExperience, Education, Skill, Project, Certification, Language } from '../types/cv';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Wand2, Briefcase, GraduationCap, Code, Languages, Award, User, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { generateAISummary } from '../services/cvService';
import { motion, AnimatePresence } from 'motion/react';
import { Switch } from '@/components/ui/switch';

interface CVEditorProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

const CVEditor: React.FC<CVEditorProps> = ({ data, onChange }) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = React.useState(false);

  const updatePersonalInfo = (field: keyof typeof data.personalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const handleAISummary = async () => {
    setIsGenerating(true);
    try {
      const summary = await generateAISummary(data);
      onChange({ ...data, about: summary });
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addItem = <T extends { id: string }>(field: keyof CVData, newItem: T) => {
    const list = data[field] as T[];
    onChange({ ...data, [field]: [...list, newItem] });
  };

  const removeItem = (field: keyof CVData, id: string) => {
    const list = (data[field] as any[]).filter((item) => item.id !== id);
    onChange({ ...data, [field]: list });
  };

  const updateItem = <T extends { id: string }>(field: keyof CVData, id: string, updates: Partial<T>) => {
    const list = (data[field] as T[]).map((item) => (item.id === id ? { ...item, ...updates } : item));
    onChange({ ...data, [field]: list });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Personal Info */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2 text-lg font-bold">
          <User className="w-5 h-5" />
          <h2>{t('editor.personalInfo')}</h2>
        </div>
        <Card className="border-none bg-secondary/30">
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('editor.field.fullName')}</Label>
              <Input value={data.personalInfo.fullName} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label>{t('editor.field.jobTitle')}</Label>
              <Input value={data.personalInfo.jobTitle} onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)} placeholder="Full Stack Developer" />
            </div>
            <div className="space-y-2">
              <Label>{t('editor.field.email')}</Label>
              <Input value={data.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label>{t('editor.field.phone')}</Label>
              <Input value={data.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} placeholder="+33 6 12 34 56 78" />
            </div>
            <div className="space-y-2">
              <Label>{t('editor.field.location')}</Label>
              <Input value={data.personalInfo.location} onChange={(e) => updatePersonalInfo('location', e.target.value)} placeholder="Paris, France" />
            </div>
            <div className="space-y-2">
              <Label>{t('editor.field.linkedin')}</Label>
              <Input value={data.personalInfo.linkedin} onChange={(e) => updatePersonalInfo('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
            </div>
            <div className="space-y-2">
              <Label>{t('editor.field.github')}</Label>
              <Input value={data.personalInfo.github} onChange={(e) => updatePersonalInfo('github', e.target.value)} placeholder="https://github.com/username" />
            </div>
            <div className="space-y-2">
              <Label>{t('editor.field.website')}</Label>
              <Input value={data.personalInfo.website} onChange={(e) => updatePersonalInfo('website', e.target.value)} placeholder="https://portfolio.com" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* About */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Target className="w-5 h-5" />
            <h2>{t('editor.about')}</h2>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 text-xs h-8"
            onClick={handleAISummary}
            disabled={isGenerating}
          >
            <Wand2 className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? t('ai.generating') : t('ai.generateSummary')}
          </Button>
        </div>
        <Textarea 
          value={data.about} 
          onChange={(e) => onChange({ ...data, about: e.target.value })} 
          placeholder="Write a brief intro or use AI to generate one..."
          className="min-h-[120px]"
        />
      </section>

      {/* Work Experience */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Briefcase className="w-5 h-5" />
            <h2>{t('editor.workExperience')}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => addItem('experience', {
            id: Date.now().toString(),
            company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: ''
          })}>
            <Plus className="w-4 h-4 mr-2" /> {t('editor.add', { item: '' })}
          </Button>
        </div>
        
        <Accordion type="multiple" className="space-y-3">
          {data.experience.map((exp) => (
            <AccordionItem key={exp.id} value={exp.id} className="border rounded-lg px-4 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start text-left">
                  <span className="font-bold">{exp.position || 'Untitled Position'}</span>
                  <span className="text-xs opacity-50">{exp.company || 'Company Name'}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('editor.field.position')}</Label>
                    <Input value={exp.position} onChange={(e) => updateItem<WorkExperience>('experience', exp.id, { position: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('editor.field.company')}</Label>
                    <Input value={exp.company} onChange={(e) => updateItem<WorkExperience>('experience', exp.id, { company: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('editor.field.startDate')}</Label>
                    <Input type="month" value={exp.startDate} onChange={(e) => updateItem<WorkExperience>('experience', exp.id, { startDate: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('editor.field.endDate')}</Label>
                    <Input type="month" value={exp.endDate} onChange={(e) => updateItem<WorkExperience>('experience', exp.id, { endDate: e.target.value })} disabled={exp.current} />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={exp.current} onCheckedChange={(checked) => updateItem<WorkExperience>('experience', exp.id, { current: checked })} />
                  <Label>{t('editor.field.current')}</Label>
                </div>
                <div className="space-y-2">
                  <Label>{t('editor.field.description')}</Label>
                  <Textarea value={exp.description} onChange={(e) => updateItem<WorkExperience>('experience', exp.id, { description: e.target.value })} className="min-h-[100px]" />
                </div>
                <Button variant="destructive" size="sm" onClick={() => removeItem('experience', exp.id)}>
                  <Trash2 className="w-4 h-4 mr-2" /> {t('editor.remove')}
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-lg font-bold">
            <GraduationCap className="w-5 h-5" />
            <h2>{t('editor.education')}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => addItem('education', {
            id: Date.now().toString(),
            institution: '', degree: '', location: '', startDate: '', endDate: '', description: ''
          })}>
            <Plus className="w-4 h-4 mr-2" /> {t('editor.add', { item: '' })}
          </Button>
        </div>
        
        <Accordion type="multiple" className="space-y-3">
          {data.education.map((edu) => (
            <AccordionItem key={edu.id} value={edu.id} className="border rounded-lg px-4 bg-card">
              <AccordionTrigger className="hover:no-underline">
                 <div className="flex flex-col items-start text-left">
                  <span className="font-bold">{edu.degree || 'Untitled Degree'}</span>
                  <span className="text-xs opacity-50">{edu.institution || 'Institution'}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('editor.field.degree')}</Label>
                    <Input value={edu.degree} onChange={(e) => updateItem<Education>('education', edu.id, { degree: e.target.value })} />
                  </div>
                   <div className="space-y-2">
                    <Label>{t('editor.field.institution')}</Label>
                    <Input value={edu.institution} onChange={(e) => updateItem<Education>('education', edu.id, { institution: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('editor.field.startDate')}</Label>
                    <Input type="month" value={edu.startDate} onChange={(e) => updateItem<Education>('education', edu.id, { startDate: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('editor.field.endDate')}</Label>
                    <Input type="month" value={edu.endDate} onChange={(e) => updateItem<Education>('education', edu.id, { endDate: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('editor.field.description')}</Label>
                  <Textarea value={edu.description} onChange={(e) => updateItem<Education>('education', edu.id, { description: e.target.value })} />
                </div>
                <Button variant="destructive" size="sm" onClick={() => removeItem('education', edu.id)}>
                  <Trash2 className="w-4 h-4 mr-2" /> {t('editor.remove')}
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Code className="w-5 h-5" />
            <h2>{t('editor.skills')}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => addItem('skills', { id: Date.now().toString(), name: '', level: 80 })}>
            <Plus className="w-4 h-4 mr-2" /> {t('editor.add', { item: '' })}
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.skills.map((skill) => (
            <Card key={skill.id} className="relative overflow-hidden group">
              <CardContent className="p-4 flex items-center gap-4">
                <Input 
                  className="flex-1 h-9 border-none focus-visible:ring-0 shadow-none px-0" 
                  value={skill.name} 
                  placeholder={t('editor.field.skillName')}
                  onChange={(e) => updateItem<Skill>('skills', skill.id, { name: e.target.value })} 
                />
                <Input 
                  type="number" 
                  className="w-16 h-8 text-xs" 
                  value={skill.level} 
                  min="0" max="100"
                  onChange={(e) => updateItem<Skill>('skills', skill.id, { level: parseInt(e.target.value) || 0 })} 
                />
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeItem('skills', skill.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Code className="w-5 h-5" />
            <h2>{t('editor.projects')}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => addItem('projects', { id: Date.now().toString(), name: '', link: '', description: '', technologies: [] })}>
            <Plus className="w-4 h-4 mr-2" /> {t('editor.add', { item: '' })}
          </Button>
        </div>
        
        <div className="space-y-4">
          {data.projects.map((proj) => (
            <Card key={proj.id} className="relative group overflow-hidden">
               <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity z-10" onClick={() => removeItem('projects', proj.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <CardContent className="p-6 space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('editor.field.projectName')}</Label>
                      <Input value={proj.name} onChange={(e) => updateItem<Project>('projects', proj.id, { name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('editor.field.projectLink')}</Label>
                      <Input value={proj.link} onChange={(e) => updateItem<Project>('projects', proj.id, { link: e.target.value })} />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label>{t('editor.field.description')}</Label>
                    <Textarea value={proj.description} onChange={(e) => updateItem<Project>('projects', proj.id, { description: e.target.value })} />
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Award className="w-5 h-5" />
            <h2>{t('editor.certifications')}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => addItem('certifications', { id: Date.now().toString(), name: '', issuer: '', date: '' })}>
            <Plus className="w-4 h-4 mr-2" /> {t('editor.add', { item: '' })}
          </Button>
        </div>
        
        <div className="space-y-4">
          {data.certifications.map((cert) => (
            <Card key={cert.id} className="group overflow-hidden">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                  <Input placeholder={t('editor.field.certName')} value={cert.name} onChange={(e) => updateItem<Certification>('certifications', cert.id, { name: e.target.value })} />
                  <Input placeholder={t('editor.field.certIssuer')} value={cert.issuer} onChange={(e) => updateItem<Certification>('certifications', cert.id, { issuer: e.target.value })} />
                  <Input type="date" value={cert.date} onChange={(e) => updateItem<Certification>('certifications', cert.id, { date: e.target.value })} />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100" onClick={() => removeItem('certifications', cert.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Languages className="w-5 h-5" />
            <h2>{t('editor.languages')}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => addItem('languages', { id: Date.now().toString(), name: '', level: '' })}>
            <Plus className="w-4 h-4 mr-2" /> {t('editor.add', { item: '' })}
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.languages.map((lang) => (
            <Card key={lang.id} className="group">
              <CardContent className="p-4 flex items-center gap-3">
                <Input 
                  className="flex-1 h-9" 
                  value={lang.name} 
                  placeholder={t('editor.field.langName')}
                  onChange={(e) => updateItem<Language>('languages', lang.id, { name: e.target.value })} 
                />
                <Input 
                  className="w-24 h-9" 
                  value={lang.level} 
                  placeholder={t('editor.field.langLevel')}
                  onChange={(e) => updateItem<Language>('languages', lang.id, { level: e.target.value })} 
                />
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100" onClick={() => removeItem('languages', lang.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CVEditor;
