import { motion } from "framer-motion";
import { Youtube, Send, Eye, Calendar, Play, ArrowUpRight } from "lucide-react";
import type { Video, Post } from "@shared/schema";

interface ContentSectionProps {
  videos: Video[];
  posts: Post[];
}

export function ContentSection({ videos, posts }: ContentSectionProps) {
  return (
    <>
      <div className="mb-16">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-primary/60 to-transparent" />
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Content</span>
        </motion.div>
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-gradient">Контент и медиа</span>
        </motion.h2>
      </div>

      <div className="mb-20">
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <Youtube className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">YouTube</h3>
            <p className="text-xs text-muted-foreground font-mono">1K+ подписчиков</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video, i) => (
            <motion.a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-premium overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-white/70 font-mono">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{video.date}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{video.views.toLocaleString()}</span>
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-relaxed">
                  {video.title}
                </h4>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <div>
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-9 h-9 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center">
            <Send className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Блог RoboFuture</h3>
            <p className="text-xs text-muted-foreground font-mono">Telegram канал</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-premium p-6 flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-muted-foreground/60 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />{post.date}
                </span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-secondary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h4 className="text-base font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-secondary transition-colors flex-1">
                {post.title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground/50 mt-auto pt-3 border-t border-border/30">
                <Eye className="w-3 h-3" />
                <span>{post.views} реакций</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </>
  );
}
