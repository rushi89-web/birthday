import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Check,
  Copy,
  FolderOpen,
  Image as ImageIcon,
  Music,
  RotateCcw,
  Sparkles,
  Heart,
  Type,
  FileCode,
} from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';

export const PersonalizeModal: React.FC = () => {
  const {
    config,
    updateField,
    updatePhotoSlot,
    resetToDefaults,
    isEditorOpen,
    setIsEditorOpen,
  } = useBirthday();

  const [activeTab, setActiveTab] = useState<'photos' | 'text' | 'letter' | 'guide' | 'export'>('photos');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isEditorOpen) return null;

  const handleFileUpload = (slotKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updatePhotoSlot(slotKey, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateField('music', {
        ...config.music,
        customAudioSrc: url,
      });
    }
  };

  const exportCodeString = `// Place this into src/config/birthdayData.ts
export const defaultBirthdayConfig = ${JSON.stringify(config, null, 2)};
`;

  const copyConfigToClipboard = () => {
    navigator.clipboard.writeText(exportCodeString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#140b13] border border-rose-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-rose-100">
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-rose-500/15 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-rose-500/20 text-rose-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-medium text-rose-100">
                Personalize & Upload Media
              </h2>
              <p className="text-xs text-rose-300/60">
                Replace photos, names, video, and romantic messages
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditorOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-rose-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-rose-500/10 overflow-x-auto bg-black/20 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'photos'
                ? 'bg-rose-500/20 text-rose-200 border border-rose-400/30'
                : 'text-rose-200/60 hover:text-rose-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Upload Her Photos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'text'
                ? 'bg-rose-500/20 text-rose-200 border border-rose-400/30'
                : 'text-rose-200/60 hover:text-rose-200'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Names & Birthday Date</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('letter')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'letter'
                ? 'bg-rose-500/20 text-rose-200 border border-rose-400/30'
                : 'text-rose-200/60 hover:text-rose-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Edit Love Letter</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'bg-rose-500/20 text-rose-200 border border-rose-400/30'
                : 'text-rose-200/60 hover:text-rose-200'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>File Placement Guide</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'export'
                ? 'bg-rose-500/20 text-rose-200 border border-rose-400/30'
                : 'text-rose-200/60 hover:text-rose-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Export Code</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-xs text-rose-200/90 leading-relaxed">
                💡 <strong className="text-white">Instant Preview:</strong> Upload her real photos directly below. They will immediately show up on the website in high resolution! You can also place the image files permanently in your project’s <span className="font-mono text-rose-300">/public/photos/</span> folder.
              </div>

              {/* Special Featured Slots */}
              <div>
                <h3 className="text-sm font-medium text-rose-200 mb-3 uppercase tracking-wider text-[11px]">
                  Featured Key Photos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Hero Photo Slot */}
                  <PhotoUploadCard
                    slotKey="hero"
                    title="Hero Main Photo"
                    currentSrc={config.heroPhoto}
                    onUpload={(e) => handleFileUpload('hero', e)}
                    onClear={() => updatePhotoSlot('hero', '')}
                  />

                  {/* Special Moment Photo */}
                  <PhotoUploadCard
                    slotKey="special"
                    title="Favorite Moment Photo"
                    currentSrc={config.specialPhoto.image}
                    onUpload={(e) => handleFileUpload('special', e)}
                    onClear={() => updatePhotoSlot('special', '')}
                  />

                  {/* Final Ending Photo */}
                  <PhotoUploadCard
                    slotKey="ending"
                    title="Final Ending Photo"
                    currentSrc={config.finalEnding.photo}
                    onUpload={(e) => handleFileUpload('ending', e)}
                    onClear={() => updatePhotoSlot('ending', '')}
                  />
                </div>
              </div>

              {/* Story 4 Photos */}
              <div>
                <h3 className="text-sm font-medium text-rose-200 mb-3 uppercase tracking-wider text-[11px]">
                  Our Story Timeline Photos (4 Slots)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {config.ourStory.map((item, idx) => (
                    <PhotoUploadCard
                      key={item.id}
                      slotKey={item.id}
                      title={`Story ${idx + 1}: ${item.title}`}
                      currentSrc={item.image}
                      onUpload={(e) => handleFileUpload(item.id, e)}
                      onClear={() => updatePhotoSlot(item.id, '')}
                    />
                  ))}
                </div>
              </div>

              {/* Music upload */}
              <div className="pt-4 border-t border-rose-500/15">
                <h3 className="text-sm font-medium text-rose-200 mb-3 uppercase tracking-wider text-[11px]">
                  Romantic Music
                </h3>
                <div className="max-w-md">
                  <div className="p-4 rounded-xl bg-white/5 border border-rose-500/20 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Music className="w-4 h-4 text-rose-400" />
                        <span className="text-sm font-medium text-rose-100">Custom Song / Music</span>
                      </div>
                      <p className="text-xs text-rose-200/60 mb-3">
                        {config.music.customAudioSrc
                          ? 'Custom music active'
                          : 'Procedural romantic chime synthesizer active'}
                      </p>
                    </div>
                    <label className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-medium cursor-pointer transition-colors border border-rose-400/30">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Audio File (.mp3)</span>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEXT & NAMES */}
          {activeTab === 'text' && (
            <div className="space-y-5 max-w-xl">
              <div>
                <label className="block text-xs font-medium text-rose-200 mb-1.5">
                  Her Name / Nickname
                </label>
                <input
                  type="text"
                  value={config.herName}
                  onChange={(e) => updateField('herName', e.target.value)}
                  placeholder="e.g. Sophia"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-rose-500/30 text-rose-100 text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-rose-200 mb-1.5">
                  Your Name (Signoff)
                </label>
                <input
                  type="text"
                  value={config.yourName}
                  onChange={(e) => updateField('yourName', e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-rose-500/30 text-rose-100 text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-rose-200 mb-1.5">
                  Her Birthday Date (Used for the live countdown)
                </label>
                <input
                  type="date"
                  value={config.birthDate}
                  onChange={(e) => updateField('birthDate', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-rose-500/30 text-rose-100 text-sm focus:outline-none focus:border-rose-400"
                />
                <span className="text-[11px] text-rose-300/50 mt-1 block">
                  Format: YYYY-MM-DD. The countdown will calculate the time until her next birthday!
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-rose-200 mb-1.5">
                  Hero Section Subtitle
                </label>
                <textarea
                  rows={2}
                  value={config.heroSubtitle}
                  onChange={(e) => updateField('heroSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-rose-500/30 text-rose-100 text-sm focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>
          )}

          {/* TAB 3: LETTER */}
          {activeTab === 'letter' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-medium text-rose-200 mb-1.5">
                  Letter Title
                </label>
                <input
                  type="text"
                  value={config.personalLetter.title}
                  onChange={(e) =>
                    updateField('personalLetter', {
                      ...config.personalLetter,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-rose-500/30 text-rose-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-rose-200 mb-1.5">
                  Greeting (Use [HER NAME] to auto-insert her name)
                </label>
                <input
                  type="text"
                  value={config.personalLetter.greeting}
                  onChange={(e) =>
                    updateField('personalLetter', {
                      ...config.personalLetter,
                      greeting: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-rose-500/30 text-rose-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-rose-200 mb-1.5">
                  Letter Paragraphs (One per line)
                </label>
                <textarea
                  rows={8}
                  value={config.personalLetter.paragraphs.join('\n\n')}
                  onChange={(e) =>
                    updateField('personalLetter', {
                      ...config.personalLetter,
                      paragraphs: e.target.value.split('\n\n').filter((p) => p.trim().length > 0),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-rose-500/30 text-rose-100 text-sm font-sans leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 4: FILE PLACEMENT GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-5 text-sm text-rose-200/90 leading-relaxed">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <h4 className="font-serif-luxury text-lg text-white font-medium mb-1">
                  Where to place your girlfriend's files in the project:
                </h4>
                <p className="text-xs text-rose-200/80">
                  You can upload files in this modal for immediate preview, or save your real photo/video files directly in the codebase:
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h5 className="font-mono text-rose-300 font-semibold text-xs mb-1">
                    📁 1. Girlfriend's Photos: /public/photos/
                  </h5>
                  <ul className="text-xs text-rose-200/70 space-y-1 list-disc list-inside">
                    <li><span className="font-mono text-rose-300">/public/photos/hero.jpg</span> — Main Hero photo</li>
                    <li><span className="font-mono text-rose-300">/public/photos/special.jpg</span> — Favorite moment photo</li>
                    <li><span className="font-mono text-rose-300">/public/photos/ending.jpg</span> — Final section portrait</li>
                    <li><span className="font-mono text-rose-300">/public/photos/story1.jpg</span> through <span className="font-mono text-rose-300">story4.jpg</span> — Timeline story memories</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h5 className="font-mono text-rose-300 font-semibold text-xs mb-1">
                    🎵 2. Romantic Background Music: /public/music/
                  </h5>
                  <p className="text-xs text-rose-200/70">
                    Place an MP3 song at <span className="font-mono text-rose-300">/public/music/romantic.mp3</span>. If empty, the built-in sweet piano chime synthesizer will play smoothly!
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h5 className="font-mono text-rose-300 font-semibold text-xs mb-1">
                    ⚙️ 3. Centralized Config File: /src/config/birthdayData.ts
                  </h5>
                  <p className="text-xs text-rose-200/70">
                    All memories, dates, love reasons, and text lines are centrally organized in <span className="font-mono text-rose-300">src/config/birthdayData.ts</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: EXPORT CODE */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-rose-200/80">
                  You can copy your updated configuration and paste it directly into <span className="font-mono text-rose-300">src/config/birthdayData.ts</span>:
                </p>
                <button
                  type="button"
                  onClick={copyConfigToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium cursor-pointer transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Config'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-rose-200 overflow-x-auto max-h-80">
                {exportCodeString}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-rose-500/15 flex items-center justify-between bg-black/40">
          <button
            type="button"
            onClick={resetToDefaults}
            className="inline-flex items-center gap-1.5 text-xs text-rose-400/70 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to defaults</span>
          </button>

          <button
            type="button"
            onClick={() => setIsEditorOpen(false)}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-medium shadow-md shadow-rose-950 transition-all cursor-pointer"
          >
            Save & View Surprise
          </button>
        </div>
      </div>
    </div>
  );
};

interface PhotoUploadCardProps {
  slotKey: string;
  title: string;
  currentSrc?: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const PhotoUploadCard: React.FC<PhotoUploadCardProps> = ({
  slotKey,
  title,
  currentSrc,
  onUpload,
  onClear,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasImage = Boolean(currentSrc && currentSrc.trim().length > 0);

  return (
    <div className="p-3 rounded-xl bg-white/5 border border-rose-500/20 flex flex-col justify-between group">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[11px] text-rose-300/80 truncate max-w-[130px]" title={title}>
          {title}
        </span>
        {hasImage && (
          <button
            type="button"
            onClick={onClear}
            className="text-[10px] text-rose-400/60 hover:text-rose-300"
          >
            Remove
          </button>
        )}
      </div>

      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/40 mb-3 border border-white/5 flex items-center justify-center">
        {hasImage ? (
          <img
            src={currentSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-2">
            <Heart className="w-5 h-5 text-rose-500/40 mx-auto mb-1" />
            <span className="text-[10px] text-rose-300/40">No photo uploaded</span>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={onUpload}
        accept="image/*"
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/20 text-rose-200 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <Upload className="w-3 h-3 text-rose-300" />
        <span>{hasImage ? 'Replace Photo' : 'Upload Photo'}</span>
      </button>
    </div>
  );
};
