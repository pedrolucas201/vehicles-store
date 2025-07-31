// components/Filtros.jsx
import React from 'react';
import {
  Box,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip,
  Flex,
  Text,
  Input,
  NumberInput, // Para os campos de min/max diretos
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const Filtros = ({
  marcas,
  anos,
  setFiltroMarca,
  setFiltroAno,
  filtroPrecoMin,
  setFiltroPrecoMin,
  filtroPrecoMax,
  setFiltroPrecoMax,
  minPrecoGlobal, // Recebido da Home
  maxPrecoGlobal, // Recebido da Home
}) => {
  const [showTooltipMin, setShowTooltipMin] = React.useState(false);
  const [showTooltipMax, setShowTooltipMax] = React.useState(false);

  // Certificar que os valores são números para o slider
  const currentMinPrice = parseFloat(filtroPrecoMin);
  const currentMaxPrice = parseFloat(filtroPrecoMax);

  // Handlers para o Chakra RangeSlider
  const handlePriceChange = (newValues) => {
    setFiltroPrecoMin(newValues[0].toString());
    setFiltroPrecoMax(newValues[1].toString());
  };

  // Função para formatar o valor do preço para exibição no tooltip
  const formatPrice = (value) => {
    return `R$ ${parseFloat(value).toLocaleString('pt-BR')}`;
  };

  return (
    <Box className="bg-black-700 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-semibold text-white mb-4">Filtrar Veículos</h2>

      <Flex direction={{ base: "column", md: "row" }} gap={4} mb={6}>
        {/* Filtro de Marca */}
        <Box flex="1">
          <Text mb="8px" color="gray.300">Marca:</Text>
          <Select
            placeholder="Todas as marcas"
            onChange={(e) => setFiltroMarca(e.target.value)}
            className="bg-gray-700 text-white border-gray-600 hover:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
            color="white"
            _placeholder={{ color: 'gray.400' }}
          >
            {marcas.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            ))}
          </Select>
        </Box>

        {/* Filtro de Ano */}
        <Box flex="1">
          <Text mb="8px" color="gray.300">Ano:</Text>
          <Select
            placeholder="Todos os anos"
            onChange={(e) => setFiltroAno(e.target.value)}
            className="bg-gray-700 text-white border-gray-600 hover:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
            color="white"
            _placeholder={{ color: 'gray.400' }}
          >
            {anos.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>

      {/* Filtro de Preço com RangeSlider */}
      <Box mb={6}>
        <Text mb="8px" color="gray.300">Preço:</Text>
        <Flex align="center" gap={4}>
          {/* Input para Preço Mínimo */}
          <NumberInput
            value={formatPrice(filtroPrecoMin)}
            onChange={(valueString) => setFiltroPrecoMin(parseFloat(valueString.replace(/[^0-9,-]+/g,"").replace(",", ".")) || "")}
            min={minPrecoGlobal}
            max={maxPrecoGlobal}
            step={1000}
            className="flex-1"
          >
            <NumberInputField
              className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Mínimo"
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Text color="gray.400">até</Text>

          {/* Input para Preço Máximo */}
          <NumberInput
            value={formatPrice(filtroPrecoMax)}
            onChange={(valueString) => setFiltroPrecoMax(parseFloat(valueString.replace(/[^0-9,-]+/g,"").replace(",", ".")) || "")}
            min={minPrecoGlobal}
            max={maxPrecoGlobal}
            step={1000}
            className="flex-1"
          >
            <NumberInputField
              className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Máximo"
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>

        <RangeSlider
          aria-label={['min-price', 'max-price']}
          min={minPrecoGlobal}
          max={maxPrecoGlobal}
          step={100} // Ajuste o passo conforme necessário (e.g., 100, 500, 1000)
          value={[currentMinPrice, currentMaxPrice]}
          onChange={handlePriceChange}
          onChangeStart={() => {
            setShowTooltipMin(true);
            setShowTooltipMax(true);
          }}
          onChangeEnd={() => {
            setShowTooltipMin(false);
            setShowTooltipMax(false);
          }}
          mt={4}
        >
          <RangeSliderTrack bg="gray.600">
            <RangeSliderFilledTrack bg="blue.500" />
          </RangeSliderTrack>
          <Tooltip
            hasArrow
            bg="blue.500"
            color="white"
            placement="top"
            isOpen={showTooltipMin}
            label={formatPrice(currentMinPrice)}
          >
            <RangeSliderThumb index={0} />
          </Tooltip>
          <Tooltip
            hasArrow
            bg="blue.500"
            color="white"
            placement="top"
            isOpen={showTooltipMax}
            label={formatPrice(currentMaxPrice)}
          >
            <RangeSliderThumb index={1} />
          </Tooltip>
        </RangeSlider>
        <Flex justify="space-between" mt={2}>
          <Text fontSize="sm" color="gray.400">
            {formatPrice(minPrecoGlobal)}
          </Text>
          <Text fontSize="sm" color="gray.400">
            {formatPrice(maxPrecoGlobal)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Filtros;