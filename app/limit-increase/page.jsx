'use client';
import Loader from '@/components/Loader';
import PageBanner from '@/components/PageBanner';
import MultiStepForm from '@/components/MultiStepForm';

const banners = [
  '/assets/img/indusind-limit.png',
  '/assets/img/indusind-banner-1.png',
  '/assets/img/indusind-banner-2.png'
];

export default function LimitIncreasePage() {
  return (
    <Loader>
      <PageBanner images={banners} />
      <MultiStepForm pageTitle="Limit Increase" />
    </Loader>
  );
}
