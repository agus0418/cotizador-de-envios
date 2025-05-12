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

interface Ubicacion {
  id: string;
  nombre: string;
}

interface Ubicaciones {
  provincias: Ubicacion[];
  departamentos: {
    [key: string]: Ubicacion[];
  };
  municipios: {
    [key: string]: Ubicacion[];
  };
}

// Estructura jerárquica de ubicaciones
const ubicaciones: Ubicaciones = {
  provincias: [
    { id: "02", nombre: "Ciudad Autónoma de Buenos Aires" },
    { id: "06", nombre: "Buenos Aires" },
    { id: "10", nombre: "Catamarca" },
    { id: "14", nombre: "Córdoba" },
    { id: "18", nombre: "Corrientes" },
    { id: "22", nombre: "Chaco" },
    { id: "26", nombre: "Chubut" },
    { id: "30", nombre: "Entre Ríos" },
    { id: "34", nombre: "Formosa" },
    { id: "38", nombre: "Jujuy" },
    { id: "42", nombre: "La Pampa" },
    { id: "46", nombre: "La Rioja" },
    { id: "50", nombre: "Mendoza" },
    { id: "54", nombre: "Misiones" },
    { id: "58", nombre: "Neuquén" },
    { id: "62", nombre: "Río Negro" },
    { id: "66", nombre: "Salta" },
    { id: "70", nombre: "San Juan" },
    { id: "74", nombre: "San Luis" },
    { id: "78", nombre: "Santa Cruz" },
    { id: "82", nombre: "Santa Fe" },
    { id: "86", nombre: "Santiago del Estero" },
    { id: "90", nombre: "Tucumán" },
    { id: "94", nombre: "Tierra del Fuego" }
  ],
  departamentos: {
    "02": [
      { id: "02007", nombre: "Comuna 1" },
      { id: "02014", nombre: "Comuna 2" },
      { id: "02021", nombre: "Comuna 3" },
      { id: "02028", nombre: "Comuna 4" },
      { id: "02035", nombre: "Comuna 5" },
      { id: "02042", nombre: "Comuna 6" },
      { id: "02049", nombre: "Comuna 7" },
      { id: "02056", nombre: "Comuna 8" },
      { id: "02070", nombre: "Comuna 10" },
      { id: "02077", nombre: "Comuna 11" },
      { id: "02084", nombre: "Comuna 12" }
    ],
    "06": [
      { id: "060007", nombre: "Adolfo Alsina" },
      { id: "060014", nombre: "Adolfo Gonzales Chaves" },
      { id: "060021", nombre: "Alberti" },
      { id: "060028", nombre: "Almirante Brown" },
      { id: "060042", nombre: "Ayacucho" },
      { id: "060049", nombre: "Azul" },
      { id: "060056", nombre: "Bahía Blanca" },
      { id: "060063", nombre: "Balcarce" },
      { id: "060070", nombre: "Baradero" },
      { id: "060077", nombre: "Bariloche" },
      { id: "060084", nombre: "Bartolomé Mitre" },
      { id: "060091", nombre: "Berazategui" },
      { id: "060098", nombre: "Berisso" },
      { id: "060105", nombre: "Bolívar" },
      { id: "060112", nombre: "Bragado" },
      { id: "060119", nombre: "Brandsen" },
      { id: "060126", nombre: "Campana" },
      { id: "060133", nombre: "Cañuelas" },
      { id: "060140", nombre: "Capitán Sarmiento" },
      { id: "060147", nombre: "Carlos Casares" },
      { id: "060154", nombre: "Carlos Tejedor" },
      { id: "060161", nombre: "Carmen de Areco" },
      { id: "060168", nombre: "Castelli" },
      { id: "060175", nombre: "Colón" },
      { id: "060182", nombre: "Coronel de Marina Leonardo Rosales" },
      { id: "060189", nombre: "Coronel Dorrego" },
      { id: "060196", nombre: "Coronel Pringles" },
      { id: "060203", nombre: "Coronel Suárez" },
      { id: "060210", nombre: "Chacabuco" },
      { id: "060217", nombre: "Chascomús" },
      { id: "060224", nombre: "Chivilcoy" },
      { id: "060231", nombre: "Daireaux" },
      { id: "060238", nombre: "Dolores" },
      { id: "060245", nombre: "Ensenada" },
      { id: "060252", nombre: "Escobar" },
      { id: "060259", nombre: "Esteban Echeverría" },
      { id: "060266", nombre: "Exaltación de la Cruz" },
      { id: "060273", nombre: "Florencio Varela" },
      { id: "060280", nombre: "General Alvarado" },
      { id: "060287", nombre: "General Alvear" },
      { id: "060294", nombre: "General Arenales" },
      { id: "060301", nombre: "General Belgrano" },
      { id: "060308", nombre: "General Guido" },
      { id: "060315", nombre: "General Juan Madariaga" },
      { id: "060322", nombre: "General La Madrid" },
      { id: "060329", nombre: "General Las Heras" },
      { id: "060336", nombre: "General Lavalle" },
      { id: "060343", nombre: "General Paz" },
      { id: "060350", nombre: "General Pinto" },
      { id: "060357", nombre: "General Pueyrredón" },
      { id: "060364", nombre: "General Rodríguez" },
      { id: "060371", nombre: "General San Martín" },
      { id: "060378", nombre: "General Sarmiento" },
      { id: "060385", nombre: "General Viamonte" },
      { id: "060392", nombre: "General Villegas" },
      { id: "060399", nombre: "Guaminí" },
      { id: "060406", nombre: "Hipólito Yrigoyen" },
      { id: "060413", nombre: "Hurlingham" },
      { id: "060420", nombre: "Ituzaingó" },
      { id: "060427", nombre: "José C. Paz" },
      { id: "060434", nombre: "Junín" },
      { id: "060441", nombre: "La Costa" },
      { id: "060448", nombre: "La Matanza" },
      { id: "060455", nombre: "La Plata" },
      { id: "060462", nombre: "Lanús" },
      { id: "060469", nombre: "Laprida" },
      { id: "060476", nombre: "Las Flores" },
      { id: "060483", nombre: "Leandro N. Alem" },
      { id: "060490", nombre: "Lezama" },
      { id: "060497", nombre: "Lincoln" },
      { id: "060504", nombre: "Lobería" },
      { id: "060511", nombre: "Lobos" },
      { id: "060518", nombre: "Lomas de Zamora" },
      { id: "060525", nombre: "Luján" },
      { id: "060532", nombre: "Magdalena" },
      { id: "060539", nombre: "Maipú" },
      { id: "060546", nombre: "Malvinas Argentinas" },
      { id: "060553", nombre: "Mar Chiquita" },
      { id: "060560", nombre: "Marcos Paz" },
      { id: "060567", nombre: "Mercedes" },
      { id: "060574", nombre: "Merlo" },
      { id: "060581", nombre: "Monte" },
      { id: "060588", nombre: "Monte Hermoso" },
      { id: "060595", nombre: "Moreno" },
      { id: "060602", nombre: "Morón" },
      { id: "060609", nombre: "Navarro" },
      { id: "060616", nombre: "Necochea" },
      { id: "060623", nombre: "9 de Julio" },
      { id: "060630", nombre: "Olavarría" },
      { id: "060637", nombre: "Patagones" },
      { id: "060644", nombre: "Pehuajó" },
      { id: "060651", nombre: "Pellegrini" },
      { id: "060658", nombre: "Pergamino" },
      { id: "060665", nombre: "Pila" },
      { id: "060672", nombre: "Pilar" },
      { id: "060679", nombre: "Pinamar" },
      { id: "060686", nombre: "Presidente Perón" },
      { id: "060693", nombre: "Puan" },
      { id: "060700", nombre: "Punta Indio" },
      { id: "060707", nombre: "Quilmes" },
      { id: "060714", nombre: "Ramallo" },
      { id: "060721", nombre: "Rauch" },
      { id: "060728", nombre: "Rivadavia" },
      { id: "060735", nombre: "Rojas" },
      { id: "060742", nombre: "Roque Pérez" },
      { id: "060749", nombre: "Saavedra" },
      { id: "060756", nombre: "Saladillo" },
      { id: "060763", nombre: "Salliqueló" },
      { id: "060770", nombre: "Salto" },
      { id: "060777", nombre: "San Andrés de Giles" },
      { id: "060784", nombre: "San Antonio de Areco" },
      { id: "060791", nombre: "San Cayetano" },
      { id: "060798", nombre: "San Fernando" },
      { id: "060805", nombre: "San Isidro" },
      { id: "060812", nombre: "San Miguel" },
      { id: "060819", nombre: "San Nicolás" },
      { id: "060826", nombre: "San Pedro" },
      { id: "060833", nombre: "San Vicente" },
      { id: "060840", nombre: "Suipacha" },
      { id: "060847", nombre: "Tandil" },
      { id: "060854", nombre: "Tapalqué" },
      { id: "060861", nombre: "Tigre" },
      { id: "060868", nombre: "Tordillo" },
      { id: "060875", nombre: "Tornquist" },
      { id: "060882", nombre: "Trenque Lauquen" },
      { id: "060889", nombre: "Tres Arroyos" },
      { id: "060896", nombre: "Tres de Febrero" },
      { id: "060903", nombre: "Tres Lomas" },
      { id: "060910", nombre: "Vicente López" },
      { id: "060917", nombre: "Villa Gesell" },
      { id: "060924", nombre: "Villarino" },
      { id: "060931", nombre: "Zárate" }
    ]
  },
  municipios: {
    "060007": [
      { id: "060007001", nombre: "Carhué" },
      { id: "060007002", nombre: "Guaminí" },
      { id: "060007003", nombre: "Laguna Alsina" }
    ],
    "060014": [
      { id: "060014001", nombre: "Adolfo Gonzales Chaves" },
      { id: "060014002", nombre: "De la Garma" }
    ],
    "060021": [
      { id: "060021001", nombre: "Alberti" },
      { id: "060021002", nombre: "Coronel Seguí" },
      { id: "060021003", nombre: "Plá" }
    ]
  }
}

const tiposPaquete = [
  { id: "1", nombre: "Sobre" },
  { id: "2", nombre: "Paquete pequeño" },
  { id: "3", nombre: "Paquete mediano" },
  { id: "4", nombre: "Paquete grande" },
  { id: "5", nombre: "Carga especial" },
]

export function Cotizador() {
  const [origen, setOrigen] = useState("")
  const [provincia, setProvincia] = useState("")
  const [departamento, setDepartamento] = useState("")
  const [municipio, setMunicipio] = useState("")
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
    const factorDistancia = origen !== municipio ? 1.5 : 1
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
                <Label htmlFor="provincia">Provincia de destino</Label>
                <Select value={provincia} onValueChange={(value: string) => {
                  setProvincia(value)
                  setDepartamento("")
                  setMunicipio("")
                }}>
                  <SelectTrigger id="provincia">
                    <SelectValue placeholder="Selecciona una provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {ubicaciones.provincias.map((prov) => (
                      <SelectItem key={prov.id} value={prov.id}>
                        {prov.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {provincia && (
                <div className="space-y-2">
                  <Label htmlFor="departamento">Departamento/Partido</Label>
                  <Select value={departamento} onValueChange={(value: string) => {
                    setDepartamento(value)
                    setMunicipio("")
                  }}>
                    <SelectTrigger id="departamento">
                      <SelectValue placeholder="Selecciona un departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {ubicaciones.departamentos[provincia]?.map((dep) => (
                        <SelectItem key={dep.id} value={dep.id}>
                          {dep.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {departamento && (
                <div className="space-y-2">
                  <Label htmlFor="municipio">Municipio/Localidad</Label>
                  <Select value={municipio} onValueChange={setMunicipio}>
                    <SelectTrigger id="municipio">
                      <SelectValue placeholder="Selecciona un municipio" />
                    </SelectTrigger>
                    <SelectContent>
                      {ubicaciones.municipios[departamento]?.map((mun) => (
                        <SelectItem key={mun.id} value={mun.id}>
                          {mun.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
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
