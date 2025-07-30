'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  url_key: string;
  image: string;
}

export default function CardsSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const baseImageUrl = 'https://skgpsd.com/skgpsdbe/public/';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          'https://skgpsd.com/skgpsdbe/public/api/web/cat-home-albums'
        );
        setCategories(res.data?.data?.categories || []);
      } catch (err) {
        console.error('Error loading categories', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium">Loading cards...</p>
      </div>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Card 1 */}
        <div className="group bg-[#FFF8E5] p-8 rounded-3xl shadow-xl flex flex-col-reverse lg:flex-row items-center gap-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          {/* Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h4 className="text-sm font-bold text-yellow-600 tracking-widest uppercase mb-2">
              Album Designing
            </h4>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 leading-snug">
              Premium Album Designing Starting At Just ₹35!
            </h3>
            <Link
              href={categories[0] ? `/album/${categories[0].url_key}` : '#'}
              className="inline-block bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition"
            >
              Book Now
            </Link>
          </div>

          {/* Image */}
          <div className="lg:w-1/2">
            <Image
              src="/Images/card-2.jpg"
              alt="Album Design"
              width={480}
              height={300}
              className="rounded-2xl shadow-md w-full object-cover"
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="group bg-[#FFF8E5] p-8 rounded-3xl shadow-xl flex flex-col-reverse lg:flex-row items-center gap-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          {/* Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h4 className="text-sm font-bold text-yellow-600 tracking-widest uppercase mb-2">
              WhatsApp Group
            </h4>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2 leading-snug">
              Join Our WhatsApp Group For Just ₹299/Month.
            </h3>
            <p className="text-gray-600 mb-4">
              Get Access to Premium PSD Templates Worth ₹5000
            </p>
            <Link
              href={categories[1] ? `/album/${categories[1].url_key}` : '#'}
              className="inline-block bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition"
            >
              Book Now
            </Link>
          </div>

          {/* Image */}
          <div className="lg:w-1/2">
            <Image
              src="/Images/card-1.jpg"
              alt="PSD Templates"
              width={480}
              height={300}
              className="rounded-2xl shadow-md w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
