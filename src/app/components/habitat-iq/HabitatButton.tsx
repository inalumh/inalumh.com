import { ArrowRight, Cpu } from 'lucide-react';
import { Button } from '../ui/button';

export function HabitatButton() {
  return (
    <Button 
      variant="default" 
      className="bg-gradient-to-r from-[#00A8E8] to-[#007EA7] hover:from-[#007EA7] hover:to-[#00A8E8] text-white font-bold border-none shadow-lg shadow-blue-500/30 transition-all duration-300 group"
    >
      Explorar Habitat IQ
      <Cpu className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
      <ArrowRight className="ml-1 w-4 h-4" />
    </Button>
  );
}
