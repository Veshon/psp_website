export default function MenuHero({ image, eyebrow, title, description, cta, target }) {
  return (
    <section className="overflow-hidden bg-palazzo-burgundy text-palazzo-cream">
      <div className="relative mx-auto grid min-h-[270px] max-w-[1320px] items-stretch md:min-h-[440px] md:grid-cols-[.9fr_1.1fr] lg:min-h-[500px]">
        <div className="relative z-10 flex min-h-[270px] flex-col items-start justify-center bg-gradient-to-r from-palazzo-burgundy/95 via-palazzo-burgundy/85 to-palazzo-burgundy/55 px-5 py-9 sm:px-8 md:min-h-0 md:bg-none md:py-14 lg:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-palazzo-gold-light">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl whitespace-pre-line font-serif text-[clamp(2.55rem,8vw,5.75rem)] leading-[.97] tracking-[-.035em] text-[#fff9ef] md:mt-5">
            {title}
          </h1>
          <p className="mt-4 max-w-md text-[13px] leading-6 text-palazzo-cream/85 sm:mt-5 sm:text-[15px] sm:leading-7">{description}</p>
          <a
            className="mt-5 inline-flex min-h-11 items-center bg-palazzo-gold px-5 py-3 text-[10px] font-semibold uppercase tracking-[.12em] text-palazzo-burgundy transition hover:bg-palazzo-gold-light md:mt-7"
            href={target}
          >
            {cta}
          </a>
        </div>

        <div className="absolute inset-0 z-0 overflow-hidden md:relative md:col-start-2 md:row-start-1 md:min-h-0 md:border-l md:border-palazzo-gold/50">
          <img className="absolute inset-0 h-full w-full object-cover" src={image} alt="" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-palazzo-burgundy/50 to-transparent md:bg-gradient-to-t md:from-palazzo-burgundy/25 md:to-transparent" />
        </div>
      </div>
    </section>
  );
}
