import React from "react";

export default function PricingPlan({ plan, price, features, buttonText }) {
  return (
    <div className="plans overflow-hidden text-center border mb-4 mb-lg-0">
      <div className="lc-block pt-4 px-md-4">
        <div className="lc-block mb-4">
          <svg width="383" height="35" viewBox="0 0 383 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="71" y="24" width="312" height="11" rx="5.5" fill="url(#paint0_linear_5_1099)"></rect>
            <rect width="312" height="11" rx="5.5" fill="url(#paint1_linear_5_1099)"></rect>
            <defs>
              <linearGradient id="paint0_linear_5_1099" x1="28.0204" y1="24" x2="455.163" y2="24" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F4F8FA"></stop>
                <stop offset="0.197917" stop-color="#F4F8FA"></stop>
                <stop offset="1" stop-color="#99F7AF"></stop>
              </linearGradient>
              <linearGradient id="paint1_linear_5_1099" x1="-42.9796" y1="0" x2="384.163" y2="0" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F4F8FA"></stop>
                <stop offset="0.33012" stop-color="#F4F8FA"></stop>
                <stop offset="1" stop-color="#99F7AF"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="lc-block">
          <div>
            <h3 className="display-6 fw-bolder ls-n2 mb-0 text-primary-gradient-3">Enterprise</h3>
          </div>
        </div>
        <div className="lc-block mb-4">
          <div>
            <p className="ls-3 opacity-25">For you Agency</p>
          </div>
        </div>
        <div className="lc-block">
          <div className="d-flex justify-content-center">
            <div>
              <p>$</p>
            </div>
            <div>
              <p className="display-1 mb-0">299</p>
              <p className="opacity-50 mb-0">/ Month</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lc-block pt-4 px-md-4 border-bottom ">
        <div className="lc-block">
          <div>
            <p className="mb-0"><strong>400</strong> Websites / month</p>
            <p><strong>400</strong> Cloud Deploys / month</p>
          </div>
        </div>
      </div>
      <div className="lc-block pt-4 px-md-4 border-bottom">
        <div className="lc-block">
          <div>
            <p><strong>Infinite</strong> pages</p>
          </div>
        </div>
      </div>
      <div className="lc-block pt-4 px-md-4 border-bottom ">
        <div>
          <p className="mb"><strong>Deploy to: </strong> Amazon S3, Azure, Bunny.net, DigitalOcean, Contabo, Wasabi</p>
        </div>
      </div>
      <div className="lc-block pt-4 px-md-4 border-bottom">
        <div className="lc-block">
          <div>
            <p><strong>iframe</strong> embedding</p>
          </div>
        </div>
      </div>
      <div className="lc-block pt-4 px-md-4 border-bottom">
        <div className="lc-block">
          <div>
            <p><strong>Google News</strong> XML Feed</p>
          </div>
        </div>
      </div>
      <div className="lc-block pt-4 px-md-4 border-bottom">
        <div className="lc-block">
          <div>
            <p><strong>Ready-made Schema</strong> templates</p>
          </div>
        </div>


      </div>
      <div className="lc-block pt-4 px-md-4 border-bottom ">
        <div className="lc-block">
          <div>
            <p>FTP Support</p>
          </div>
        </div>
      </div>
      <div className="lc-block pt-4 px-md-4 border-bottom ">
        <div className="lc-block">
          <div>
            <p><strong>Stack</strong> Forms</p>
          </div>
        </div>
      </div>
      <div className="lc-block mt-5">
        <a className="btn btn-primary bg-white mb-4 btn-lg" href="#" role="button">Buy now</a>
      </div>
    </div>
  )
}