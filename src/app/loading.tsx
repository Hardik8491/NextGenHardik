"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{
            rotate: 360,
            borderRadius: ["50% 50% 50% 50%", "60% 40% 60% 40%", "40% 60% 40% 60%", "50% 50% 50% 50%"],
          }}
          transition={{
            rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            borderRadius: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="w-24 h-24 bg-gradient-to-r from-primary to-primary-foreground mx-auto mb-8 flex items-center justify-center"
        >
          <Loader2 className="h-12 w-12 text-background animate-spin" />
        </motion.div>

        <motion.h1
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading Portfolio
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="h-1 bg-primary max-w-xs mx-auto rounded-full"
        />

        <motion.p
          className="text-muted-foreground mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Preparing an amazing experience...
        </motion.p>
      </motion.div>
    </div>
  )
}

