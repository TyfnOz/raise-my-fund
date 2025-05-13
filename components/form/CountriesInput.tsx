import { Label } from '@/components/ui/label';
import { formattedCountries } from '@/utils/countries';
import Flag from "react-world-flags";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const name = 'country';

function CountriesInput({defaultValue}:{defaultValue?:string}) {
  return (
    <div className='mb-2'>
        <Label htmlFor={name} className='capitalize mb-1'>
            Country
        </Label>
        <Select 
            defaultValue={defaultValue || formattedCountries[0].code}
            name={name}
            required
        >
            <SelectTrigger id={name} className='cursor-pointer w-full'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {formattedCountries.map((item) => {
                    return <SelectItem key={item.code} value={item.code} className='cursor-pointer'>
                        <span style={{letterSpacing: "0px"}} className='flex items-center gap-2 '>
                        <Flag code={item.code} style={{ width: 20, height: 20 }} /> {item.name}
                        </span>
                    </SelectItem>
                })}
            </SelectContent>
        </Select>
    </div>
  )
}

export default CountriesInput;