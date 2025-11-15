import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Youtube, FileText, Eye, Calendar, ExternalLink } from "lucide-react";
import type { Video, Post } from "@shared/schema";

interface ContentSectionProps {
  videos: Video[];
  posts: Post[];
}

export function ContentSection({ videos, posts }: ContentSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <div className="mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold font-mono mb-4 text-primary"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          data-testid="heading-content"
        >
          <span className="text-foreground">&gt;_</span> КОНТЕНТ И ПУБЛИКАЦИИ
        </motion.h2>
        <motion.div 
          className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      <div className="mb-16">
        <motion.div 
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Youtube className="w-8 h-8 text-accent" data-testid="icon-youtube" />
          <h3 className="text-2xl font-bold font-mono text-foreground" data-testid="heading-youtube">
            YouTube Канал
          </h3>
          <Badge variant="outline" className="font-mono border-accent/50 text-accent" data-testid="badge-youtube-subs">
            1K+ подписчиков
          </Badge>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {videos.map((video) => (
            <motion.div key={video.id} variants={itemVariants}>
              <Card
                className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-accent/50 transition-all duration-300 hover-elevate"
                data-testid={`card-video-${video.id}`}
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    data-testid={`img-video-thumbnail-${video.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center" data-testid={`button-play-overlay-${video.id}`}>
                      <Youtube className="w-8 h-8 text-background" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-base font-semibold mb-3 line-clamp-2 text-foreground group-hover:text-accent transition-colors" data-testid={`text-video-title-${video.id}`}>
                    {video.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1" data-testid={`container-video-date-${video.id}`}>
                      <Calendar className="w-3 h-3" data-testid={`icon-video-date-${video.id}`} />
                      <span data-testid={`text-video-date-${video.id}`}>{video.date}</span>
                    </div>
                    <div className="flex items-center gap-1" data-testid={`container-video-views-${video.id}`}>
                      <Eye className="w-3 h-3" data-testid={`icon-video-views-${video.id}`} />
                      <span data-testid={`text-video-views-${video.id}`}>{video.views} просм.</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-accent/30 hover:border-accent"
                    asChild
                    data-testid={`button-video-watch-${video.id}`}
                  >
                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                      <Youtube className="w-4 h-4 mr-2" />
                      Смотреть
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div>
        <motion.div 
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FileText className="w-8 h-8 text-secondary" data-testid="icon-blog" />
          <h3 className="text-2xl font-bold font-mono text-foreground" data-testid="heading-blog">
            Блог RoboFuture
          </h3>
          <Badge variant="outline" className="font-mono border-secondary/50 text-secondary" data-testid="badge-blog-platform">
            Telegram
          </Badge>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Card
                className="group p-6 bg-card/50 backdrop-blur-sm border-border hover:border-secondary/50 transition-all duration-300 hover-elevate h-full flex flex-col"
                data-testid={`card-post-${post.id}`}
              >
                <div className="mb-4 flex-1">
                  <h4 className="text-lg font-semibold mb-2 line-clamp-2 text-foreground group-hover:text-secondary transition-colors" data-testid={`text-post-title-${post.id}`}>
                    {post.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed" data-testid={`text-post-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1" data-testid={`container-post-date-${post.id}`}>
                    <Calendar className="w-3 h-3" data-testid={`icon-post-date-${post.id}`} />
                    <span data-testid={`text-post-date-${post.id}`}>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1" data-testid={`container-post-views-${post.id}`}>
                    <Eye className="w-3 h-3" data-testid={`icon-post-views-${post.id}`} />
                    <span data-testid={`text-post-views-${post.id}`}>{post.views} просм.</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-secondary/30 hover:border-secondary"
                  asChild
                  data-testid={`button-post-read-${post.id}`}
                >
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Читать
                  </a>
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
