import { Reveal, RevealItem } from './Reveal';

interface Props {
  eyebrow: string;
  title: string;
  lead?: string;
  id?: string;
}

export function SectionHead({ eyebrow, title, lead, id }: Props) {
  return (
    <Reveal as="header" className="section-head" staggerChildren={0.08}>
      <RevealItem as="p" className="eyebrow">
        {eyebrow}
      </RevealItem>
      <RevealItem as="h2" className="section-title" id={id}>
        {title}
      </RevealItem>
      {lead && (
        <RevealItem as="p" className="section-lead">
          {lead}
        </RevealItem>
      )}
    </Reveal>
  );
}
