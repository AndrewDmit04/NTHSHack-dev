import QRCodeStyling, { Options } from 'qr-code-styling';
import { useEffect, useRef, useState } from 'react';

export interface QRCodeProps {
  data: string;
  width: number;
  height: number;
  group: string;
}

const IMAGE_GROUP_MAPPING = {
  Astronaut: '/assets/astro.webp',
  Alien: '/assets/alien.webp',
  Robot: '/assets/robot.png',
  Cyborg: '/assets/cyborg.png',
};

const COLOR_GROUP_MAPPING = {
  Astronaut: 'black',
  Robot: 'darkblue',
  Alien: 'green',
  Cyborg: 'black',
};

export default function QRCode({ data, width, height, group }: QRCodeProps) {
  const [options, setOptions] = useState<Options>({
    width,
    height,
    type: 'svg',
    data,
    image: IMAGE_GROUP_MAPPING[group],
    margin: 10,
    dotsOptions: {
      color: COLOR_GROUP_MAPPING[group],
    },
    imageOptions: {
      hideBackgroundDots: true,
    },
  });
  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setQrCode(new QRCodeStyling(options));
  }, []);

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode?.update(options);
  }, [qrCode, options]);

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      data,
    }));
  }, [qrCode, data]);

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      image: IMAGE_GROUP_MAPPING[group],
      dotsOptions: {
        color: COLOR_GROUP_MAPPING[group],
      },
    }));
  }, [qrCode, group]);

  return <div ref={ref} />;
}
