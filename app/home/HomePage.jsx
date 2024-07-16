'use client';
import { useWeb3AffiliateContract } from 'app/_contracts/useWeb3AffiliateContract';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import Footer from '@/components/layout/footer/Footer';
import AccountConnect from '@/components/layout/header/AccountConnect';
import Header from '@/components/layout/header/Header';
import React from 'react';
import { EyeOpenIcon, LayersIcon, LightningBoltIcon, LockClosedIcon } from '@radix-ui/react-icons';

export default function HomePage() {
  const account = useAccount();
  const { data: hash, isPending, writeContract, status, error } = useWriteContract();
  const w3a = useWeb3AffiliateContract();

  let abi = w3a.abi;

  let affiliateAddress = '0xb90CF0B4038EB2cfA405ce4D7810654517aFfEd5';

  const {
    isError: readError,
    data: readData,
    status: readStatus,
    error: readErrorMsg,
  } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    functionName: 'getReferrals',
    args: [account.address],
  });

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let date = Math.floor(new Date().getTime() / 1000);

    writeContract({
      abi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      functionName: 'createReferral',
      args: [affiliateAddress, account.address, date, 'https://onchain-affiliate-web.vercel.app'],
    });
  }

  const features = [
    {
      name: 'Enhanced Security',
      description: 'Every referral is permanently stored onchain',
      icon: LockClosedIcon,
    },
    {
      name: 'Seamless Integration',
      description:
        'Onchain Affiliate integrates effortlessly with your Shopify store. Customers automatically receive signup discounts at checkout. No need to enter a discount code.',
      icon: LayersIcon,
    },
    {
      name: 'Increased Transparency',
      description:
        'Affiliates and Merchants have a clear, auditable record of every referral and earned commission.',
      icon: EyeOpenIcon,
    },
    {
      name: 'Automatic Payouts',
      description:
        'Affiliates earn instant payouts on their sales after order confirmation, directly tied to their referral history.',
      icon: LightningBoltIcon,
    },
  ];

  return (
    <>
      <Header />
      <main className="relative isolate">
        <div className="bg-base-blue text-white">
          <div className="mx-auto max-w-3xl px-4 py-32 sm:py-48 md:px-8 lg:py-56">
            <div className="">
              <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-6xl lg:text-center">
                Stop worrying about the accuracy and reliability of your referral program
              </h1>
              <p className="mt-6 font-sans text-xl leading-8 tracking-tight md:text-2xl lg:text-center">
                We store your referrals onchain, eliminating the risk of data loss or manipulation.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white py-16 text-base-blue sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mt-2 font-serif text-3xl font-bold capitalize tracking-tight sm:text-4xl">
                Here's how it works
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-12">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="font-serif text-lg font-semibold leading-7 ">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg">
                        <feature.icon aria-hidden="true" className="h-6 w-6 text-base-blue" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 leading-7">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-16">
              <div style={{ position: 'relative', paddingBottom: '58.91980360065466%', height: 0 }}>
                <iframe
                  src="https://www.loom.com/embed/677c5f4be8de4a75be92d10218ab68c0?sid=86f57c24-6c0b-4dfd-9576-d0d3eb5535ca"
                  frameBorder={0}
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden">
          <h3 className="text-lg">Account</h3>
          <ul>
            <li>
              <b>status</b>: {account.status}
            </li>
            <li>
              <b>addresses</b>: {JSON.stringify(account.addresses)}
            </li>
            <li>
              <b>chainId</b>: {account.chainId}
            </li>
            <li>
              <div>Wagmi Status: {status}</div>
              <div>Error: {error?.message}</div>
              <div>
                {error?.name} {JSON.stringify(error?.cause)}
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-base-blue py-16 text-white sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to get started?
              </h2>
            </div>
          </div>

          <div className="mx-auto mt-16 px-4 lg:max-w-screen-lg lg:text-xl">
            <p>Follow the steps below:</p>
            <ol className="list-inside list-decimal space-y-8">
              <li>
                <p className="inline-block">Claim the discount.</p>
                <div className="mx-auto mt-8 flex max-w-fit flex-col items-center bg-white py-5 text-base-blue md:flex-row md:space-x-6 px-4 md:px-8 border-dashed border-green-600 border-8">
                  <h2 className="md:max-w-sm text-base lg:text-lg">
                    Sign up and get 10% off your next order at OA Snowboards
                  </h2>
                  {account.isDisconnected ? (
                    <AccountConnect />
                  ) : (
                    <form className="flex md:flex-col" onSubmit={submit}>
                      <input
                        name="affiliateAddress"
                        placeholder="0x0"
                        readOnly
                        hidden
                        value={affiliateAddress}
                      />
                      <input
                        name="customerAddress"
                        placeholder="0x0"
                        readOnly
                        hidden
                        value={account.address}
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-base-blue px-4 py-2 text-sm text-white"
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        disabled={readData?.signupDate}
                      >
                        {readData?.signupDate ? "You're on the list!" : 'Claim offer'}
                      </button>
                      <a
                        href="https://onchain-affiliate.myshopify.com"
                        className="border-base mt-2 rounded-full border-2 bg-white px-3 py-2 text-center text-base text-sm no-underline"
                        target="_blank"
                      >
                        Shop now
                      </a>
                    </form>
                  )}
                </div>
              </li>
              <li>
                <p className="inline-block">Visit our <a className='underline-offset-4' href="https://onchain-affiliate.myshopify.com">demo store</a>. The store password is <span className='font-mono bg-white text-base-blue rounded-md px-2'>cheeyo</span>. At checkout, use this payment info.</p>
                <div className="p-3 text-sm lg:text-base mt-3 font-mono max-w-fit">
                  <p><span className='font-bold'>Credit card number:</span> <span className='font-mono'>1</span></p>
                  <p><span className='font-bold'>CVV:</span> any 3-digit number, eg.<span className='font-mono'>123</span></p>
                  <p><span className='font-bold'>Expiry Date:</span> any date in the future</p>
                </div>
              </li>
              <li>
                <p className="inline-block"><a className='underline-offset-4' href="https://sepolia.basescan.org/address/0xfa44d585f6028815060e900947ec71e50a7e0ea8#internaltx" target="_blank">Check the chain</a> for payouts to affiliates.</p>
              </li>
            </ol>
          </div>
        </div>

        <div className="hidden">
          <h1>My Referrals</h1>
          {JSON.stringify(readData)}
        </div>
      </main>
      <Footer />
    </>
  );
}
