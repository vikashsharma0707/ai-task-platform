import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Database, Container, Workflow, GitBranch, Boxes, Network } from 'lucide-react';

const FEATURES = [
  { label: 'JWT Authentication', icon: ShieldCheck },
  { label: 'AI Background Worker', icon: Cpu },
  { label: 'Redis Queue Processing', icon: Network },
  { label: 'MongoDB Storage', icon: Database },
  { label: 'Docker Containers', icon: Container },
  { label: 'Kubernetes Deployment', icon: Boxes },
  { label: 'GitHub Actions CI/CD', icon: GitBranch },
  { label: 'Argo CD GitOps', icon: Workflow },
];

export function AuthHero() {
  return (
    <div className="relative hidden overflow-hidden bg-[#0F172A] lg:flex lg:w-[60%] lg:flex-col lg:justify-center lg:px-16 lg:py-12">
      {/* grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* glowing orbs */}
      <motion.div
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[110px]"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-[130px]"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="relative z-10 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          All systems operational
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl font-semibold leading-tight tracking-tight text-white"
        >
          AI Task Processing Platform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-[15px] leading-relaxed text-slate-400"
        >
          Build, process and monitor asynchronous AI workloads with enterprise-grade reliability.
        </motion.p>

        <div className="mt-10 grid grid-cols-2 gap-3">
          {FEATURES.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 backdrop-blur-sm transition-colors hover:bg-white/[0.07]"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
                <Icon size={14} />
              </div>
              <span className="text-[13px] font-medium text-slate-300">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="relative z-10 mt-12 text-xs text-slate-500">
        © {new Date().getFullYear()} AI Task Platform · v2.4.0
      </p>
    </div>
  );
}