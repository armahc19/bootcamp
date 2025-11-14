import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface CourseCardProps {
  image: string;
  title: string;
  instructor: string;
  rating?: number;
}

export const CourseCard = ({ image, title, instructor, rating = 4.8 }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-primary transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{instructor}</p>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-medium text-foreground">{rating}</span>
        </div>
      </div>
    </Card>
  );
};
