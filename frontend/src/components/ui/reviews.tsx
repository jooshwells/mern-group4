import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  { name: "Mark Zuckerberg", review: "Way better than Obsidian! I love NANTA!" },
  { name: "Tim Cook", review: "Hands down the best note taking app I've ever used." },
  { name: "Bill Gates", review: "NANTA skyrocketed my productivity. Best app ever!" },
  { name: "Jeff Bezos", review: "From brainstorming to execution, NANTA makes it all effortless." },
  { name: "Elon Musk", review: "NANTA is a game-changer for organizing my thoughts." },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    },5000);
    return () => clearInterval(interval);
  }, []);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const currentReview = reviews[currentIndex];

  return (
    <div className="flex flex-col items-center text-center mt-16 space-y-6 w-full max-w-4xl mx-auto px-6 md:px-10">
      <h2 className="text-2xl md:text-3xl font-semibold">Customer Testimonials</h2>

      <Card className="rounded-2xl shadow-md transition-shadow w-full max-w-xl">
        <CardContent className="flex flex-col items-center text-center px-6 pt-3 pb-3">
          <div className="font-semibold text-2xl mb-1">{currentReview.name}</div>
          <p className="text-lg text-muted-foreground italic my-4 flex-1 flex items-center justify-center">
            “{currentReview.review}”
          </p>
          <div className="flex space-x-1 text-yellow-500 mb-4">
            {[...Array(5)].map((_, j) => (
              <Star key={j} size={18} fill="currentColor" />
            ))}
          </div>

          <div className="flex space-x-4 mt-2">
            <button
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={goPrev}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={goNext}
            >
              Next
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}