
export default function Footer() {
  return (
<footer className="bg-gray-200 text-gray-900 py-6 px-16 font-sans tracking-wide">
  <div className="flex justify-between items-center max-lg:flex-col text-center flex-wrap gap-4">
    <p className="text-[15px] leading-loose">
      © Kyokara Shopping All rights reserved.
    </p>
    <ul className="flex space-x-6 gap-y-2 max-lg:justify-center flex-wrap">
      <li>
        <a href="" className="text-[15px] hover:text-[#ff4c04]">
          Terms of Service
        </a>
      </li>
      <li>
        <a href="" className="text-[15px] hover:text-[#ff4c04]">
          Privacy Policy
        </a>
      </li>
      <li>
        <a href="" className="text-[15px] hover:text-[#ff4c04]">
          Contact
        </a>
      </li>
    </ul>
  </div>
</footer>

  )
}
