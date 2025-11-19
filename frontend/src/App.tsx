import './App.css'
import { Button } from './components/ui/button'
import { Link } from "react-router-dom"
import Header from './components/ui/header'
import { motion } from "framer-motion"
import StickyHeader from './components/sticky-header'
import Reviews from "./components/ui/reviews";

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
            Organize your thoughts with speed and elegance, better than the rest.
          </p>
        </motion.div>

        {/* signup button*/}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-1 mb-10"
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

      </main>

      {/* notes preview */}
      <motion.img
        src="/note-light.png"
        alt="Notes preview in light mode"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-[70%] h-auto object-contain rounded-2xl p-2 border-2 border-foreground dark:hidden"
      />

      <motion.img
        src="/note-dark.png"
        alt="Notes preview in dark mode"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-[70%] h-auto object-contain rounded-2xl p-2 border-2 border-foreground hidden dark:block"
      />

      {/* reviews wrapper */}
      <Reviews/>
  </div>
  )
}

export default App
