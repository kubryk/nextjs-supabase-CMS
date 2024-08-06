'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className='flex gap-3 justify-center items-center'>
            {currentPage > 1 &&
                <Link className=' disable-link' href={createPageURL(currentPage - 1)}>
                    <FaArrowAltCircleLeft size={30} />
                </Link>
            }


            <div className='flex gap-1'>
                {[...Array(totalPages)].map((value, index) => {
                    return (
                        <Link key={index + currentPage} href={createPageURL(index + 1)}>
                            <Button disabled={currentPage == index + 1 ? true : false}>{index + 1}</Button>
                        </Link>
                    )
                })}
            </div>
            {currentPage < totalPages &&
                <Link href={createPageURL(currentPage + 1)}>
                    <FaArrowAltCircleRight size={30} />
                </Link>
            }


        </div>
    )


}