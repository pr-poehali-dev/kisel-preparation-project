import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

type Kissel = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  ingredients: string[];
};

const kisselData: Kissel[] = [
  {
    id: 1,
    name: 'Ягодный кисель',
    description: 'Насыщенный вкус лесных ягод',
    price: 250,
    image: 'https://cdn.poehali.dev/projects/c163488e-453c-4e73-942d-53c02805ee45/files/6e8b1746-3642-42c8-942c-e585a5ed1062.jpg',
    type: 'ягодный',
    ingredients: ['клубника', 'черника', 'малина']
  },
  {
    id: 2,
    name: 'Персиковый кисель',
    description: 'Нежный персиковый вкус',
    price: 220,
    image: 'https://cdn.poehali.dev/projects/c163488e-453c-4e73-942d-53c02805ee45/files/bedef42f-3c89-42d0-b75e-853141d02d79.jpg',
    type: 'фруктовый',
    ingredients: ['персик']
  },
  {
    id: 3,
    name: 'Вишнёвый кисель',
    description: 'Классический вишнёвый вкус',
    price: 230,
    image: 'https://cdn.poehali.dev/projects/c163488e-453c-4e73-942d-53c02805ee45/files/6e8b1746-3642-42c8-942c-e585a5ed1062.jpg',
    type: 'ягодный',
    ingredients: ['вишня']
  },
  {
    id: 4,
    name: 'Яблочный кисель',
    description: 'Свежий яблочный аромат',
    price: 200,
    image: 'https://cdn.poehali.dev/projects/c163488e-453c-4e73-942d-53c02805ee45/files/bedef42f-3c89-42d0-b75e-853141d02d79.jpg',
    type: 'фруктовый',
    ingredients: ['яблоко', 'корица']
  },
  {
    id: 5,
    name: 'Смородиновый кисель',
    description: 'Яркий вкус чёрной смородины',
    price: 240,
    image: 'https://cdn.poehali.dev/projects/c163488e-453c-4e73-942d-53c02805ee45/files/6e8b1746-3642-42c8-942c-e585a5ed1062.jpg',
    type: 'ягодный',
    ingredients: ['смородина']
  },
  {
    id: 6,
    name: 'Клюквенный кисель',
    description: 'Полезный клюквенный напиток',
    price: 260,
    image: 'https://cdn.poehali.dev/projects/c163488e-453c-4e73-942d-53c02805ee45/files/6e8b1746-3642-42c8-942c-e585a5ed1062.jpg',
    type: 'ягодный',
    ingredients: ['клюква']
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'catalog' | 'about'>('home');
  const [priceRange, setPriceRange] = useState([200, 300]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const allTypes = ['ягодный', 'фруктовый'];
  const allIngredients = ['клубника', 'черника', 'малина', 'персик', 'вишня', 'яблоко', 'корица', 'смородина', 'клюква'];

  const filteredKissel = kisselData.filter(kissel => {
    const priceMatch = kissel.price >= priceRange[0] && kissel.price <= priceRange[1];
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(kissel.type);
    const ingredientMatch = selectedIngredients.length === 0 || 
      kissel.ingredients.some(ing => selectedIngredients.includes(ing));
    return priceMatch && typeMatch && ingredientMatch;
  });

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) ? prev.filter(i => i !== ingredient) : [...prev, ingredient]
    );
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">🌸 Кисель Онлайн</h1>
          <div className="flex gap-4">
            <Button 
              variant={activeSection === 'home' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('home')}
            >
              Главная
            </Button>
            <Button 
              variant={activeSection === 'catalog' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('catalog')}
            >
              Каталог
            </Button>
            <Button 
              variant={activeSection === 'about' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('about')}
            >
              О киселе
            </Button>
          </div>
        </div>
      </nav>

      {activeSection === 'home' && (
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl font-bold leading-tight">
                Волшебный мир <span className="text-primary">киселя</span> 🌟
              </h2>
              <p className="text-xl text-muted-foreground">
                Натуральные напитки из лучших ягод и фруктов с доставкой прямо к вашей двери
              </p>
              <Button 
                size="lg" 
                className="text-lg"
                onClick={() => setActiveSection('catalog')}
              >
                <Icon name="ShoppingCart" className="mr-2" />
                Смотреть каталог
              </Button>
            </div>
            <div className="animate-float">
              <img 
                src="https://cdn.poehali.dev/projects/c163488e-453c-4e73-942d-53c02805ee45/files/fbb591dc-92ce-4e39-8074-fd3e1a1f4c13.jpg"
                alt="Аниме персонаж"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="text-center animate-scale-in hover:scale-105 transition-transform">
              <CardHeader>
                <div className="text-4xl mb-2">🍓</div>
                <CardTitle>100% Натурально</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Только настоящие ягоды и фрукты без искусственных добавок</p>
              </CardContent>
            </Card>

            <Card className="text-center animate-scale-in hover:scale-105 transition-transform" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <div className="text-4xl mb-2">🚚</div>
                <CardTitle>Быстрая доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Доставим свежий кисель в течение 2 часов по городу</p>
              </CardContent>
            </Card>

            <Card className="text-center animate-scale-in hover:scale-105 transition-transform" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <div className="text-4xl mb-2">💜</div>
                <CardTitle>Полезно и вкусно</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Богатый витаминами напиток для вашего здоровья</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'catalog' && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold mb-8 text-center">Каталог киселя</h2>
          
          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Фильтры</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Цена: {priceRange[0]}₽ - {priceRange[1]}₽
                    </label>
                    <Slider
                      min={150}
                      max={300}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Тип киселя</label>
                    <div className="space-y-2">
                      {allTypes.map(type => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox 
                            id={type}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={() => toggleType(type)}
                          />
                          <label htmlFor={type} className="text-sm cursor-pointer capitalize">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Ингредиенты</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {allIngredients.map(ingredient => (
                        <div key={ingredient} className="flex items-center space-x-2">
                          <Checkbox 
                            id={ingredient}
                            checked={selectedIngredients.includes(ingredient)}
                            onCheckedChange={() => toggleIngredient(ingredient)}
                          />
                          <label htmlFor={ingredient} className="text-sm cursor-pointer capitalize">
                            {ingredient}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedTypes([]);
                      setSelectedIngredients([]);
                      setPriceRange([200, 300]);
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredKissel.map(kissel => (
                  <Card key={kissel.id} className="animate-fade-in hover:shadow-xl transition-all overflow-hidden group">
                    <div className="overflow-hidden">
                      <img 
                        src={kissel.image} 
                        alt={kissel.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{kissel.name}</CardTitle>
                        <Badge variant="secondary">{kissel.type}</Badge>
                      </div>
                      <CardDescription>{kissel.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {kissel.ingredients.map(ing => (
                          <Badge key={ing} variant="outline" className="text-xs">
                            {ing}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-2xl font-bold text-primary">{kissel.price}₽</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full group-hover:bg-primary/90">
                        <Icon name="ShoppingCart" className="mr-2" size={16} />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredKissel.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-2xl text-muted-foreground">Ничего не найдено 😢</p>
                  <p className="text-muted-foreground mt-2">Попробуйте изменить фильтры</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-12">О киселе 🍇</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>История киселя</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Кисель — традиционный русский напиток, известный с древних времён. 
                  Изначально его варили из овсяной муки, но со временем рецепт изменился, 
                  и теперь кисель готовят из ягод и фруктов с добавлением крахмала.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Наш кисель готовится по старинным рецептам из натуральных ягод 
                  без искусственных красителей и консервантов. Мы сохраняем все 
                  полезные свойства ягод и фруктов!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Польза киселя</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Icon name="Heart" className="text-primary mt-1" size={20} />
                    <span className="text-muted-foreground">Богат витаминами и антиоксидантами</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Sparkles" className="text-primary mt-1" size={20} />
                    <span className="text-muted-foreground">Улучшает пищеварение</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Zap" className="text-primary mt-1" size={20} />
                    <span className="text-muted-foreground">Заряжает энергией на весь день</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Shield" className="text-primary mt-1" size={20} />
                    <span className="text-muted-foreground">Укрепляет иммунитет</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Почему выбирают нас?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Мы — молодая команда энтузиастов, влюблённых в традиционные 
                  русские напитки. Наша миссия — сделать кисель доступным каждому, 
                  сохранив его натуральность и пользу.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Заказывайте кисель онлайн и наслаждайтесь вкусом детства! 💜
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <footer className="bg-muted mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Кисель Онлайн. Сделано с любовью 💜
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;