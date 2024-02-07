import { logoWhite } from "../../../assets"

const Footer = () => {
  return (
    <div className="bg-[#18214F] text-[#808BC5] py-16">
      <div className="container">
        <div className="flex flex-col gap-5 lg:flex-row items-center justify-between border-b border-[#8f8f8f42] pb-10">
          <div className="w-full">
            <img src={logoWhite} alt="" />
            <p className="text-[14px] my-5 text-[#808BC5] lg:pe-36">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
          <div className="w-full">
            <p className="text-white text-[24px] font-[600] mb-4">Subscribe To Our Newsletter</p>
            <div className="p-2 bg-white flex justify-between rounded-lg">
              <input placeholder="Enter Your Email" className="ps-2 bg-transparent focus-visible:border-0 focus-visible:outline-none " type="text" />
              <button className="text-[14px] text-white bg-[--primary] uppercase py-3" >subscribe</button>
            </div>
          </div>
        </div>
        <div className="copywrite py-5 flex flex-col gap-5 lg:flex-row items-center justify-between">
          <p>Copyright 2023 All right reserved.</p>
          <p>Powered by <span className="text-white">Dalia Alawneh</span></p>
        </div>
      </div>
    </div>
  )
}

export default Footer