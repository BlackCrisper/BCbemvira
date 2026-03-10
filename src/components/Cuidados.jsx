import { useState, useMemo } from 'react';
import { useInView } from '../hooks/useInView';

const CLEANING_STEPS = [
  { icon: 'fa-droplet', title: 'Passo 1: Enxágue Inicial', text: 'Enxágue a joia com água corrente para remover sujeiras soltas e partículas externas.', tip: 'Use água morna para melhor eficácia', tipIcon: 'fa-lightbulb' },
  { icon: 'fa-shirt', title: 'Passo 2: Secagem e Polimento', text: 'Use uma flanela macia para secar e polir a sua joia. Seque bem para evitar a oxidação.', tip: 'Movimentos circulares suaves são mais eficazes', tipIcon: 'fa-lightbulb' },
  { icon: 'fa-sparkles', title: 'Passo 3: Limpa-Prata (Opcional)', text: 'Se necessário, utilize limpa-prata com moderação — aplique uma pequena quantidade em um pano e passe delicadamente.', tip: 'Use com moderação para não danificar o banho', tipIcon: 'fa-exclamation-triangle' },
  { icon: 'fa-clock', title: 'Passo 4: Evite Imersão Prolongada', text: 'Evite deixar as peças imersas por longos períodos em soluções químicas ou uso excessivo de produtos polidores.', tip: 'Máximo 2-3 minutos de imersão', tipIcon: 'fa-clock' },
  { icon: 'fa-gem', title: 'Passo 5: Cuidado com Pedras', text: 'Se a joia tiver pedras, proceda com cuidado: evite molhar excessivamente pedras porosas e prefira limpeza localizada com flanela úmida.', tip: 'Pedras porosas podem ser danificadas por água', tipIcon: 'fa-gem' },
];

const CUIDADOS_LIST = [
  'Joias podem ser danificadas por produtos químicos, sabonetes, golpes fortes ou fricção intensa. Evite usá-las em tarefas domésticas e retire os anéis ao lavar as mãos.',
  'Guarde as joias separadamente e tenha cuidado com o contato das joias com outros objetos quando as estiver usando.',
  'Evite contato prolongado com água do mar, produtos de limpeza e perfumes. Retire as peças antes de nadar ou aplicar cosméticos.',
  'Para limpar prata, com ou sem pedra, utilize uma flanela macia e produtos de limpeza com moderação.',
  'Inspecione suas joias periodicamente para verificar folgas em fechos, engastes soltos ou sinais de desgaste.',
];

const CONFETTI_COLORS = ['#762a85', '#9854a3', '#e8d5ec', '#5d1f69'];
const CONFETTI_COUNT = 24;

function Confetti() {
  const dots = useMemo(() =>
    Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
      id: i,
      left: `${10 + (i * 4) % 80}%`,
      top: '50%',
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: `${i * 0.08}s`,
      duration: `${1.5 + (i % 3) * 0.3}s`,
    })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
      {dots.map((d) => (
        <div
          key={d.id}
          className="cuidados-confetti-dot"
          style={{
            left: d.left,
            top: d.top,
            background: d.color,
            animationDelay: d.delay,
            animationDuration: d.duration,
          }}
        />
      ))}
    </div>
  );
}

export function Cuidados() {
  const [step, setStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [sectionRef, sectionInView] = useInView();

  const current = CLEANING_STEPS[step - 1];
  const isFirst = step === 1;
  const isLast = step === CLEANING_STEPS.length;
  const progressPercent = (step / CLEANING_STEPS.length) * 100;

  const handleNext = () => {
    if (isLast) setShowResult(true);
    else setStep((s) => s + 1);
  };
  const handlePrev = () => setStep((s) => Math.max(1, s - 1));
  const handleRestart = () => {
    setStep(1);
    setShowResult(false);
  };

  return (
    <section id="cuidados" ref={sectionRef} className="scroll-mt-20 bg-white py-16 md:py-24" aria-labelledby="cuidados-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="cuidados-title" className={`section-title fade-in font-['Playfair_Display'] font-semibold ${sectionInView ? 'visible' : ''}`}>
          Cuidados
        </h2>
        <h3 className="mb-4 text-xl font-semibold text-[var(--color-dark-text)]">Cuidados com suas Jóias</h3>
        <p className="mb-6 text-[var(--color-medium-gray)]">
          <strong>Vamos conferir alguns dos cuidados que devemos realizar com a joia Bemvirá:</strong>
        </p>
        <div className="mb-12 rounded-2xl border border-[var(--color-light-purple)] bg-[var(--color-soft-white)] p-6">
          <ul className="space-y-4" role="list">
            {CUIDADOS_LIST.map((text, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-medium text-white">
                  {i + 1}
                </span>
                <span className="text-[var(--color-dark-text)]">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-[var(--color-light-purple)] bg-gradient-to-b from-[var(--color-soft-white)] to-white p-6 shadow-lg md:p-8">
          <div className="mb-6 text-center">
            <h3 className="mb-2 text-lg font-semibold uppercase tracking-wide text-[var(--color-dark-text)] md:text-xl">
              Como limpar prata? Aprenda a limpar suas joias
            </h3>
            <p className="text-sm text-[var(--color-medium-gray)]">
              A prata pode escurecer com o tempo devido à oxidação natural. Siga esse passo a passo interativo para recuperar o brilho sem danificar o banho ou pedras:
            </p>
          </div>

          {!showResult ? (
            <>
              {/* Barra de progresso estilo minijogo */}
              <div className="mb-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-[var(--color-primary)]">Nível {step} de {CLEANING_STEPS.length}</span>
                  <span className="text-[var(--color-medium-gray)]">{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[var(--color-light-purple)]">
                  <div
                    className="cuidados-progress-bar h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="mb-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isFirst}
                  className="cuidados-btn-press flex items-center gap-2 rounded-xl border-2 border-[var(--color-primary)] bg-white px-4 py-2.5 font-medium text-[var(--color-primary)] transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[var(--color-light-purple)] hover:shadow-[0_4px_15px_rgba(118,42,133,0.2)]"
                >
                  <i className="fas fa-chevron-left" /> <span className="hidden sm:inline">Anterior</span>
                </button>
                <span className="cuidados-step-badge flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white shadow-md">
                  {step}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="cuidados-btn-press btn-gradient-bemvira flex items-center gap-2 rounded-xl px-4 py-2.5 font-semibold text-white"
                >
                  <span className="hidden sm:inline">{isLast ? 'Finalizar' : 'Próximo'}</span> <i className="fas fa-chevron-right" />
                </button>
              </div>

              {/* Card do passo atual – re-anima ao trocar de passo */}
              <div key={step} className="cuidados-step-enter rounded-xl bg-white p-6 shadow-inner ring-2 ring-[var(--color-light-purple)]">
                <div className="cuidados-step-icon mb-4 flex justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-3xl text-white shadow-lg">
                    <i className={`fas ${current.icon}`} />
                  </span>
                </div>
                <h4 className="mb-2 text-center text-lg font-semibold text-[var(--color-dark-text)]">{current.title}</h4>
                <p className="mb-4 text-center text-[var(--color-medium-gray)]">{current.text}</p>
                <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                  <i className={`fas ${current.tipIcon} mt-0.5 shrink-0`} />
                  <span>{current.tip}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="relative overflow-hidden rounded-xl bg-white py-10 shadow-inner">
              <Confetti />
              <div className="relative flex flex-col items-center">
                <div className="cuidados-result-check mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-4xl text-white shadow-xl">
                  <i className="fas fa-check" />
                </div>
                <h4 className="cuidados-result-title mb-2 text-2xl font-bold text-[var(--color-primary)] md:text-3xl">
                  Missão concluída!
                </h4>
                <p className="mb-2 text-center text-lg font-semibold text-[var(--color-dark-text)]">
                  Parabéns! Sua prata está limpa!
                </p>
                <p className="mb-8 max-w-md text-center text-[var(--color-medium-gray)]">
                  A sua joia Bemvirá está pronta para brilhar novamente. Siga sempre estes passos para manter o brilho e a qualidade das suas peças.
                </p>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="cuidados-btn-press btn-gradient-bemvira inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white"
                >
                  <i className="fas fa-redo" /> Jogar novamente
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50/50 p-4">
            <div className="mb-2 flex items-center gap-2 font-semibold text-amber-900">
              <i className="fas fa-info-circle" /> Observações Importantes
            </div>
            <p className="text-sm text-amber-900/90">
              <strong>A Bemvirá não se responsabiliza pela execução inadequada da limpeza dos seus produtos.</strong> IMPORTANTE: os tipos de produtos, as quantidades de produtos usados e os períodos de imersão das joias devem ser observados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
