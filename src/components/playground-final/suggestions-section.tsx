import { Input } from "../ui/input";

export default function SuggestionsSection() {
    return (
        <div className="px-4.5 flex-1 rounded-3xl border bg-(--porcelain-1) py-4.5 max-h-fit">
            <h3 className="font-medium text-black mb-2">Suggestions for Refinement</h3>
            <div className="mb-5">
                <Input
                    placeholder={`'Try a warmer pink'`}
                    className="w-full bg-[#FFF9E6] border border-(--input-placeholder) rounded-2 gap-2 opacity-100 placeholder:text-black!"
                />
            </div>

            <h3 className="font-medium text-black flex gap-2">Try one of these</h3>
            <div className="flex mb-2 gap-1 text-md justify-between">
                <button className="text-[14px] p-2.5 rounded-md border border-[#B87D00] bg-gradient-to-b from-(--slider-gradient-form) to-(--slider-gradient-to)">
                    Startup workspace
                </button>
                <button className="p-2.5 text-[14px] rounded-md border border-[#B87D00] bg-gradient-to-b from-(--slider-gradient-form) to-(--slider-gradient-to)">
                    Vibrant summer fest
                </button>
            </div>
            <button className="w-full p-2.5 text-[14px] rounded-md border border-[#B87D00] bg-gradient-to-b from-(--slider-gradient-form) to-(--slider-gradient-to)">
                Warm cozy autumn coffee shop
            </button>
        </div>
    );
}
