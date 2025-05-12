"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo
const sucursales = [
  { id: "1", nombre: "Sucursal Central" },
  { id: "2", nombre: "Sucursal Norte" },
  { id: "3", nombre: "Sucursal Sur" },
  { id: "4", nombre: "Sucursal Este" },
  { id: "5", nombre: "Sucursal Oeste" },
]

const ciudades = [
  { id: "1", nombre: "Ciudad Capital" },
  { id: "2", nombre: "Ciudad del Norte" },
  { id: "3", nombre: "Ciudad del Sur" },
  { id: "4", nombre: "Ciudad del Este" },
  { id: "5", nombre: "Ciudad del Oeste" },
  { id: "6", nombre: "Ciudad Costera" },
]

const tiposPaquete = [
  { id: "1", nombre: "Sobre" },
  { id: "2", nombre: "Paquete pequeño" },
  { id: "3", nombre: "Paquete mediano" },
  { id: "4", nombre: "Paquete grande" },
  { id: "5", nombre: "Carga especial" },
]

export function Cotizador() {
  const [origen, setOrigen] = useState("")
  const [destino, setDestino] = useState("")
  const [tipoPaquete, setTipoPaquete] = useState("")
  const [largo, setLargo] = useState("")
  const [ancho, setAncho] = useState("")
  const [alto, setAlto] = useState("")
  const [peso, setPeso] = useState("")
  const [cotizacion, setCotizacion] = useState<number | null>(null)

  const handleCotizar = () => {
    // Simulación de cálculo de cotización
    // En un caso real, esto podría ser una llamada a una API
    const largoNum = Number.parseFloat(largo) || 0
    const anchoNum = Number.parseFloat(ancho) || 0
    const altoNum = Number.parseFloat(alto) || 0
    const pesoNum = Number.parseFloat(peso) || 0

    // Fórmula simple para calcular el costo
    const volumen = largoNum * anchoNum * altoNum
    const factorDistancia = origen !== destino ? 1.5 : 1
    const factorTipoPaquete = Number.parseInt(tipoPaquete) || 1

    const costo = (volumen * 0.01 + pesoNum * 2) * factorDistancia * factorTipoPaquete
    setCotizacion(Math.max(costo, 10)) // Mínimo $10
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Cotizador de Envíos</CardTitle>
        <CardDescription>Completa el formulario para obtener el costo de tu envío</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="envio" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="envio">Datos de envío</TabsTrigger>
            <TabsTrigger value="paquete">Datos del paquete</TabsTrigger>
          </TabsList>
          <TabsContent value="envio" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origen">Sucursal de origen</Label>
                <Select value={origen} onValueChange={setOrigen}>
                  <SelectTrigger id="origen">
                    <SelectValue placeholder="Selecciona una sucursal" />
                  </SelectTrigger>
                  <SelectContent>
                    {sucursales.map((sucursal) => (
                      <SelectItem key={sucursal.id} value={sucursal.id}>
                        {sucursal.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destino">Ciudad de destino</Label>
                <Select value={destino} onValueChange={setDestino}>
                  <SelectTrigger id="destino">
                    <SelectValue placeholder="Selecciona una ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    {ciudades.map((ciudad) => (
                      <SelectItem key={ciudad.id} value={ciudad.id}>
                        {ciudad.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="paquete" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="tipoPaquete">Tipo de paquete</Label>
              <Select value={tipoPaquete} onValueChange={setTipoPaquete}>
                <SelectTrigger id="tipoPaquete">
                  <SelectValue placeholder="Selecciona un tipo de paquete" />
                </SelectTrigger>
                <SelectContent>
                  {tiposPaquete.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="largo">Largo (cm)</Label>
                <Input
                  id="largo"
                  type="number"
                  placeholder="0"
                  value={largo}
                  onChange={(e) => setLargo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ancho">Ancho (cm)</Label>
                <Input
                  id="ancho"
                  type="number"
                  placeholder="0"
                  value={ancho}
                  onChange={(e) => setAncho(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alto">Alto (cm)</Label>
                <Input id="alto" type="number" placeholder="0" value={alto} onChange={(e) => setAlto(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input id="peso" type="number" placeholder="0" value={peso} onChange={(e) => setPeso(e.target.value)} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {cotizacion !== null && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Cotización estimada</h3>
            <p className="text-2xl font-bold">${cotizacion.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Este es un valor estimado. El precio final puede variar.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleCotizar} className="w-full">
          Cotizar envío
        </Button>
      </CardFooter>
    </Card>
  )
}
