import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import AnimatedBackground from '@/components/AnimatedBackground';
import FloatingElements from '@/components/FloatingElements';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <AnimatedBackground />
      <FloatingElements />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-center items-center">
          <div className="font-display font-bold text-2xl text-primary">exf4tt</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 min-h-screen flex items-center">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInUp relative z-10">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary font-medium text-sm rounded-full mb-4">
                🇷🇺 РФ
              </span>
              <h1 className="font-display text-6xl lg:text-7xl font-bold leading-none mb-6">
                EXF4TT
              </h1>
              <p className="text-2xl text-muted-foreground mb-8">
                Профессиональный интернет-критик
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-lg">
                <Icon name="Zap" size={24} className="text-primary" />
                <span>Токсичные комментарии</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <Icon name="MessageSquare" size={24} className="text-primary" />
                <span>Интернет-дискуссии</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <Icon name="Target" size={24} className="text-primary" />
                <span>Точная критика</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-white font-semibold animate-pulse-glow">
                Связаться
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-accent">
                Портфолио
              </Button>
            </div>
          </div>

          <div className="animate-fadeInUp animation-delay-2000 relative z-10">
            <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
              <Card className="p-0 overflow-hidden bg-card/50 border-border hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
                <img 
                  src="https://cdn.poehali.dev/files/be08ea87-0f60-41d0-9d2c-654eea5d4953.jpg" 
                  alt="Art Portrait 1"
                  className="w-full h-80 object-cover object-top filter contrast-125"
                />
              </Card>
              <Card className="p-0 overflow-hidden bg-card/50 border-border hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://cdn.poehali.dev/files/6c7c09ba-cc7e-48f9-a2f5-a5a6e9bdd831.jpg" 
                  alt="Art Portrait 2"
                  className="w-full h-80 object-cover object-center filter contrast-125"
                />
              </Card>
              <Card className="p-0 overflow-hidden bg-card/50 border-border hover:scale-105 transition-transform duration-300 col-span-2">
                <img 
                  src="https://cdn.poehali.dev/files/07e78d20-c338-4da4-bbbc-f0fa28769856.jpg" 
                  alt="Art Portrait 3"
                  className="w-full h-60 filter contrast-125 rounded-[0.25rem] object-cover px-0 mx-0 py-[1px] my-0"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold mb-8">Обо мне</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Специализируюсь на создании качественного контента в интернете. 
              Мой подход к общению — прямой, честный и без компромиссов. 
              Если вы готовы к настоящему диалогу, добро пожаловать в мой мир.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 bg-card border-border hover:border-primary transition-colors">
                <Icon name="MessageCircle" size={32} className="text-primary mb-4 mx-auto" />
                <h3 className="font-semibold text-lg mb-2">Коммуникация</h3>
                <p className="text-muted-foreground">
                  Прямое общение без лишних церемоний
                </p>
              </Card>
              
              <Card className="p-6 bg-card border-border hover:border-primary transition-colors">
                <Icon name="Eye" size={32} className="text-primary mb-4 mx-auto" />
                <h3 className="font-semibold text-lg mb-2">Анализ</h3>
                <p className="text-muted-foreground">
                  Глубокий разбор ситуаций и событий
                </p>
              </Card>
              
              <Card className="p-6 bg-card border-border hover:border-primary transition-colors">
                <Icon name="Users" size={32} className="text-primary mb-4 mx-auto" />
                <h3 className="font-semibold text-lg mb-2">Сообщество</h3>
                <p className="text-muted-foreground">
                  Активное участие в дискуссиях
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold mb-8">Контакты</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Готов к диалогу? Не стесняйтесь писать
            </p>
            
            <div className="flex justify-center gap-6 mb-8">
              <Button size="lg" variant="outline" className="border-border hover:bg-accent gap-2">
                <Icon name="Send" size={20} />
                Telegram
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-accent gap-2">
                <Icon name="Mail" size={20} />
                Email
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-accent gap-2">
                <Icon name="MessageSquare" size={20} />
                Discord
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-muted-foreground">
                <Icon name="MapPin" size={16} className="inline mr-2" />
                Россия
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 EXF4TT. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;