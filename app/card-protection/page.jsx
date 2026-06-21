'use client';
import Loader from '@/components/Loader';
import PageBanner from '@/components/PageBanner';
import MultiStepForm from '@/components/MultiStepForm';

const banners = [
  '/assets/img/indusind-protection.png',
  '/assets/img/indusind-banner-1.png',
  '/assets/img/indusind-banner-2.png'
];

export default function CardProtectionPage() {
  return (
    <Loader>
      <PageBanner images={banners} />
      <MultiStepForm pageTitle="Card Protection Plan" />
    </Loader>
  );
}
