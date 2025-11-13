import './App.css'
import { Button } from './components/ui/button'
import { GitHubLink } from './components/github'
import { Link } from "react-router-dom"
import Header from './components/ui/header'
import Theme from "./components/ui/theme-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import StickyHeader from './components/sticky-header'

function App() {
  return (
    <div className="relative flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background text-foreground">

     {/* scrolling sticky header */}
      <StickyHeader />

      {/* Main content */}
      {/* motion divs for animations */}
      <main className="flex flex-col items-center text-center mt-8 md:mt-12 space-y-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Header />
          <p className="mt-4 text-lg text-muted-foreground max-w-lg">
            Built for thinkers, dreamers, and doers.  
            Organize your thoughts with speed and beauty, just like Obsidian — but better.
          </p>
        </motion.div>

        {/* signup button*/}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
           <Link to="/signup">
            <Button
              size="lg"
              className="px-10 py-8 -ml-4 text-lg" >
              Sign Up Now!
            </Button>
          </Link>

        </motion.div>

        {/* Placeholder for note page */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-4xl mx-auto mt-4"
        >
          <div className="bg-gray-200 dark:bg-gray-700 h-[60vh] max-h-[800px] rounded-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-300">
              placeholder for actual note page screenshot
            </span>
          </div>
        </motion.div>

        {/* fake reviews */}
        <section className="w-full mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Customer Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full">
        {[
          { name: "Mark Zuckerberg", review: "Way better than Obsidian! I love NANTA!" },
          { name: "Tim Cook",        review: "Hands down the best note taking app I've ever used." },
          { name: "Bill Gates",      review: "NANTA skyrocketed my productivity. Best app ever!" },
        ].map((r, idx) => (
      <Card key={idx} className="rounded-2xl shadow-md hover:shadow-lg transition-shadow h-full">
      <CardContent className="flex flex-col items-center text-center px-6 pt-3 pb-3  h-full justify-between">
        {/* name */}
        <div className="font-semibold text-lg mb-1">{r.name}</div>

        {/* review */}
        <p className="text-sm text-muted-foreground italic my-4 flex-1 flex items-center justify-center">
          “{r.review}”
        </p>
        {/* star rating */}
        <div className="flex space-x-1 text-yellow-500">
          {[...Array(5)].map((_, j) => (
            <Star key={j} size={18} fill="currentColor" />
          ))}
        </div>
      </CardContent>
    </Card>
  ))}
  </div>
</section>
      </main>

    </div>
  )
}

export default App