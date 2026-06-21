'use client';
import Loader from '@/components/Loader';
import PageBanner from '@/components/PageBanner';
import MultiStepForm from '@/components/MultiStepForm';

const banners = [
  '/assets/img/indusind-reward.png',
  '/assets/img/indusind-banner-1.png',
  '/assets/img/indusind-banner-2.png'
];

export default function RewardPointPage() {
  return (
    <Loader>
      <PageBanner images={banners} />
      <MultiStepForm pageTitle="Reward Point" />
    </Loader>
  );
}
