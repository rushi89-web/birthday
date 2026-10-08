import React from 'react';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';
import { PhotoPlaceholder } from './PhotoPlaceholder';

export const OurStorySection: React.FC = () => {
  const { config } = useBirthday();

  return (
    <section id="our-story" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-rose-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-3">
            <span>Chapter by Chapter</span>
            <span aria-hidden="true">·</span>
            <span>Unforgettable Days</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-rose-50 tracking-tight mb-4">
            Our Little Story <span className="text-rose-500">❤️</span>
          </h2>
          <p className="text-sm sm:text-base text-rose-200/70 font-light leading-relaxed">
            Every step we’ve taken together has led to this moment. Here are some of the sweetest chapters we have written so far.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line for desktop, left line for mobile */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-rose-500/20 via-pink-400/40 to-rose-500/20 md:-translate-x-1/2" />

          <div className="space-y-16 sm:space-y-24">
            {config.ourStory.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Heart */}
                  <div className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 w-9 h-9 rounded-full bg-[#1b0d18] border-2 border-rose-400/60 flex items-center justify-center text-rose-300 shadow-md shadow-rose-950/80 z-20">
                    <Heart className="w-4 h-4 fill-rose-500/50 text-rose-400" />
                  </div>

                  {/* Text Story Card (one side) */}
                  <div className="w-full md:w-1/2 pl-14 md:pl-0">
                    <div
                      className={`glass-panel p-6 sm:p-8 rounded-2xl glass-card-hover relative ${
                        isEven ? 'md:mr-8 md:text-left' : 'md:ml-8 md:text-left'
                      }`}
                    >
                      {/* Date & Location metadata */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-rose-300/70 mb-3">
                        <span className="flex items-center gap-1 font-medium text-rose-300">
                          <Calendar className="w-3.5 h-3.5 text-rose-400" />
                          {item.date}
                        </span>
                        {item.location && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-1 text-rose-300/60">
                              <MapPin className="w-3.5 h-3.5" />
                              {item.location}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif-luxury text-xl sm:text-2xl text-rose-50 font-normal mb-3 leading-snug">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-rose-200/80 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Photo Card (other side) */}
                  <div className="w-full md:w-1/2 pl-14 md:pl-0">
                    <div className={`${isEven ? 'md:ml-8' : 'md:mr-8'}`}>
                      <div className="rounded-2xl overflow-hidden border border-rose-500/25 bg-[#140a12] shadow-xl group">
                        {item.image ? (
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-3 left-4 text-xs font-serif-luxury text-rose-100">
                              {item.title}
                            </div>
                          </div>
                        ) : (
                          <PhotoPlaceholder
                            slotKey={item.id}
                            label={item.title || 'Your memory goes here ❤️'}
                            aspectRatioClass="aspect-[4/3]"
                            minHeight="min-h-[220px]"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
