import { useInView } from '../hooks/useInView';

const VALUES = [
  { title: 'Harmonia Familiar', desc: 'A essência dos três irmãos em cada detalhe.' },
  { title: 'Qualidade Refinada', desc: 'Cuidado na escolha de cada peça.' },
  { title: 'Elegância Funcional', desc: 'Estilo pensado para cada momento.' },
  { title: 'Significado Único', desc: 'Cada joia carrega histórias, conquistas e emoções.' },
];

export function About() {
  const [titleRef, titleInView] = useInView();
  const [textRef, textInView] = useInView();
  const [cardsRef, cardsInView] = useInView();

  return (
    <section id="sobre" className="scroll-mt-20 bg-[var(--color-soft-white)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          ref={titleRef}
          className={`section-title fade-in font-['Playfair_Display'] font-semibold ${titleInView ? 'visible' : ''}`}
        >
          Nossa História
        </h2>
        <div
          ref={textRef}
          className={`fade-in prose prose-lg mx-auto max-w-3xl text-center text-[var(--color-medium-gray)] ${textInView ? 'visible' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <p className="mb-4 text-[1.1rem] leading-relaxed">
            A Bemvirá nasceu do sonho de três irmãos em transformar cada história em algo único e especial. Nossa marca carrega a essência familiar e o propósito de criar joias eternas que marcam momentos importantes na vida de cada cliente, com qualidade, significado e curadoria exclusiva.
          </p>
          <p className="mb-0 text-[1.1rem] leading-relaxed">
            Cada peça é cuidadosamente criada para ultrapassar fronteiras e culturas, tornando-se eterna em cada história que toca. Participar da vida das pessoas de forma tão especial, celebrando conquistas e novos ciclos, é nossa maior honra. Bem-estar, bem-viver e estilo em cada detalhe.
          </p>
        </div>
        <div
          ref={cardsRef}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`fade-in value-card-bemvira p-8 ${cardsInView ? 'visible' : ''}`}
              style={{ transitionDelay: `${0.15 + i * 0.08}s` }}
            >
              <h3 className="mb-3 text-xl font-semibold text-[var(--color-primary)]">{v.title}</h3>
              <p className="text-sm text-[var(--color-medium-gray)]">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
