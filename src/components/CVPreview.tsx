import React from 'react';
import { CVData } from '../types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CVPreviewProps {
  data: CVData;
  id?: string;
}

const CVPreview: React.FC<CVPreviewProps> = ({ data, id }) => {
  const { t } = useTranslation();

  const formatDate = (date: string) => {
    if (!date) return '';
    return date; // In a real app we'd format this
  };

  const renderContactItem = (Icon: any, text: string, link?: string) => {
    if (!text) return null;
    return (
      <div className="flex items-center gap-2 text-sm">
        <Icon size={14} className="opacity-70 shrink-0" />
        {link ? (
          <a href={link} target="_blank" rel="noreferrer" className="hover:underline">
            {text}
          </a>
        ) : (
          <span>{text}</span>
        )}
      </div>
    );
  };

  const TemplateMinimal = () => (
    <div className="p-8 max-w-[800px] mx-auto bg-white min-h-[1050px]" style={{ color: '#1a1a1a' }}>
      <header className="mb-8 border-b pb-8">
        <h1 className="text-4xl font-bold uppercase tracking-tight mb-2" style={{ color: data.themeColor }}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl opacity-80 mb-4">{data.personalInfo.jobTitle || 'Your Profession'}</p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-gray-600">
          {renderContactItem(Mail, data.personalInfo.email)}
          {renderContactItem(Phone, data.personalInfo.phone)}
          {renderContactItem(MapPin, data.personalInfo.location)}
          {renderContactItem(Linkedin, 'LinkedIn', data.personalInfo.linkedin)}
          {renderContactItem(Github, 'GitHub', data.personalInfo.github)}
          {renderContactItem(Globe, 'Website', data.personalInfo.website)}
        </div>
      </header>

      {data.about && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 mb-4 pb-1 inline-block" style={{ borderColor: data.themeColor }}>
            {t('editor.about')}
          </h2>
          <p className="text-sm leading-relaxed">{data.about}</p>
        </section>
      )}

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-8">
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 mb-4 pb-1 inline-block" style={{ borderColor: data.themeColor }}>
                {t('editor.workExperience')}
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-base">{exp.position}</h3>
                      <span className="text-xs uppercase bg-gray-100 px-2 py-1 rounded">
                        {formatDate(exp.startDate)} — {exp.current ? t('preview.present') : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div className="text-sm font-medium opacity-80 mb-2">{exp.company} | {exp.location}</div>
                    <div className="text-sm prose prose-sm max-w-none whitespace-pre-wrap">{exp.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 mb-4 pb-1 inline-block" style={{ borderColor: data.themeColor }}>
                {t('editor.education')}
              </h2>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-base">{edu.degree}</h3>
                      <span className="text-xs uppercase opacity-70">
                        {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <div className="text-sm font-medium opacity-80 mb-1">{edu.institution}</div>
                    <p className="text-sm">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-8">
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 mb-4 pb-1 inline-block" style={{ borderColor: data.themeColor }}>
                {t('editor.skills')}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.skills.map((skill) => (
                  <span key={skill.id} className="text-xs px-3 py-1 bg-gray-100 font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 mb-4 pb-1 inline-block" style={{ borderColor: data.themeColor }}>
                {t('editor.projects')}
              </h2>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-center gap-1 font-bold text-sm mb-1">
                      {proj.name}
                      {proj.link && <a href={proj.link} target="_blank" rel="noreferrer"><ExternalLink size={12} /></a>}
                    </div>
                    <p className="text-xs opacity-80">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 mb-4 pb-1 inline-block" style={{ borderColor: data.themeColor }}>
                {t('editor.languages')}
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-xs opacity-60 uppercase">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const TemplateModern = () => (
    <div className="p-0 max-w-[800px] mx-auto bg-white min-h-[1050px] shadow-sm flex flex-col" style={{ color: '#1a1a1a' }}>
      <header className="p-10 text-white" style={{ backgroundColor: data.themeColor }}>
        <h1 className="text-5xl font-black mb-1 leading-tight tracking-tighter uppercase">{data.personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-xl opacity-90 font-medium mb-6 uppercase tracking-wider">{data.personalInfo.jobTitle || 'Your Profession'}</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3 opacity-90 text-[13px] border-t border-white/20 pt-6">
          {renderContactItem(Mail, data.personalInfo.email)}
          {renderContactItem(Phone, data.personalInfo.phone)}
          {renderContactItem(MapPin, data.personalInfo.location)}
        </div>
      </header>

      <main className="p-10 pt-8 grid grid-cols-12 gap-10 flex-1">
        <div className="col-span-12 space-y-10">
           {data.about && (
            <section>
              <h2 className="text-xl font-bold mb-4 uppercase tracking-tighter" style={{ color: data.themeColor }}>{t('editor.about')}</h2>
              <p className="text-[15px] leading-relaxed opacity-90">{data.about}</p>
            </section>
          )}

          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-8 space-y-10">
              {data.experience.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-6 uppercase tracking-tighter" style={{ color: data.themeColor }}>{t('editor.workExperience')}</h2>
                  <div className="space-y-8 relative before:absolute before:left-[-1.5rem] before:w-[2px] before:h-full before:bg-gray-100">
                    {data.experience.map((exp) => (
                      <div key={exp.id} className="relative">
                         <div className="absolute left-[-1.75rem] top-1.5 w-3 h-3 rounded-full bg-white border-2" style={{ borderColor: data.themeColor }} />
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className="font-bold text-lg">{exp.position}</h3>
                          <span className="text-[11px] font-bold opacity-50 whitespace-nowrap">
                            {formatDate(exp.startDate)} — {exp.current ? t('preview.present') : formatDate(exp.endDate)}
                          </span>
                        </div>
                        <div className="font-bold text-sm mb-3 uppercase tracking-wide opacity-70">{exp.company} • {exp.location}</div>
                        <div className="text-[14px] opacity-80 whitespace-pre-wrap">{exp.description}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

               {data.education.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-6 uppercase tracking-tighter" style={{ color: data.themeColor }}>{t('editor.education')}</h2>
                   <div className="space-y-8">
                    {data.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-lg">{edu.degree}</h3>
                          <span className="text-[11px] font-bold opacity-50">
                            {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                          </span>
                        </div>
                        <div className="text-sm font-medium opacity-70 mb-2 italic">{edu.institution}</div>
                        <p className="text-[14px] opacity-80">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="col-span-4 space-y-10">
              {data.skills.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-4 uppercase tracking-tighter" style={{ color: data.themeColor }}>{t('editor.skills')}</h2>
                  <div className="space-y-4">
                    {data.skills.map((skill) => (
                      <div key={skill.id} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider opacity-70">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${skill.level}%`, backgroundColor: data.themeColor }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

               {data.projects.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-4 uppercase tracking-tighter" style={{ color: data.themeColor }}>{t('editor.projects')}</h2>
                   <div className="space-y-4">
                    {data.projects.map((proj) => (
                      <div key={proj.id} className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-bold flex items-center justify-between">
                          {proj.name}
                           {proj.link && <a href={proj.link} target="_blank" rel="noreferrer"><ExternalLink size={12} className="opacity-50" /></a>}
                        </h3>
                        <p className="text-[11px] mt-1 opacity-70 leading-relaxed">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  const TemplateSidebar = () => (
    <div className="max-w-[800px] mx-auto bg-white min-h-[1050px] flex shadow-sm" style={{ color: '#1a1a1a' }}>
      {/* Sidebar */}
      <aside className="w-1/3 bg-gray-50 p-8 border-r space-y-8">
        <div className="space-y-4">
           <h1 className="text-3xl font-bold uppercase tracking-tighter leading-tight" style={{ color: data.themeColor }}>
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-lg font-medium opacity-70">{data.personalInfo.jobTitle || 'Your Profession'}</p>
        </div>

        <div className="space-y-4 pt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('editor.personalInfo')}</h2>
          <div className="space-y-3">
            {renderContactItem(Mail, data.personalInfo.email)}
            {renderContactItem(Phone, data.personalInfo.phone)}
            {renderContactItem(MapPin, data.personalInfo.location)}
            {renderContactItem(Linkedin, 'LinkedIn', data.personalInfo.linkedin)}
            {renderContactItem(Github, 'GitHub', data.personalInfo.github)}
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('editor.skills')}</h2>
            <div className="space-y-3">
               {data.skills.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: data.themeColor }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('editor.languages')}</h2>
            <div className="space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between text-xs">
                  <span className="font-bold">{lang.name}</span>
                  <span className="opacity-60">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-10 space-y-10">
        {data.about && (
          <section>
             <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-l-4 pl-3" style={{ borderLeftColor: data.themeColor }}>
              {t('editor.about')}
            </h2>
            <p className="text-sm leading-relaxed opacity-80">{data.about}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-l-4 pl-3" style={{ borderLeftColor: data.themeColor }}>
              {t('editor.workExperience')}
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{exp.position}</h3>
                    <span className="text-[10px] font-bold opacity-40 uppercase">
                      {formatDate(exp.startDate)} — {exp.current ? t('preview.present') : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="text-xs font-bold opacity-60 mb-3 uppercase tracking-wide">{exp.company} | {exp.location}</div>
                  <div className="text-sm opacity-80 whitespace-pre-wrap leading-relaxed">{exp.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
             <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-l-4 pl-3" style={{ borderLeftColor: data.themeColor }}>
              {t('editor.education')}
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <span className="text-[10px] font-bold opacity-40 uppercase">
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <div className="text-xs font-bold opacity-60 mb-1">{edu.institution}</div>
                  <p className="text-sm opacity-70">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );

  return (
    <div id={id} className="bg-white shadow-2xl w-[800px] border border-gray-100">
      {data.template === 'modern' ? <TemplateModern /> : data.template === 'sidebar' ? <TemplateSidebar /> : <TemplateMinimal />}
    </div>
  );
};

export default CVPreview;
