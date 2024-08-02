import CardRedirect from '@/components/card-redirect/CardRedirect';

export default function Page({ params }: { params: { id: string } }) {
  return <CardRedirect id={params.id} />;
}
