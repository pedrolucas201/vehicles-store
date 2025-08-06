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
  NumberInput,
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
  minPrecoGlobal,
  maxPrecoGlobal,
}) => {
  const [showTooltipMin, setShowTooltipMin] = React.useState(false);
  const [showTooltipMax, setShowTooltipMax] = React.useState(false);

  const currentMinPrice = parseFloat(filtroPrecoMin);
  const currentMaxPrice = parseFloat(filtroPrecoMax);

  const handlePriceChange = (newValues) => {
    setFiltroPrecoMin(newValues[0].toString());
    setFiltroPrecoMax(newValues[1].toString());
  };

  const formatPrice = (value) => {
    return `R$ ${parseFloat(value).toLocaleString('pt-BR')}`;
  };

  return (
    <Box bg="black.700" p={6} rounded="lg" shadow="lg" mb={8}>
      <h2 className="text-xl font-semibold text-white mb-4">Filtrar Veículos</h2>

      <Flex direction={{ base: "column", md: "row" }} gap={4} mb={6}>
        {/* Filtro de Marca */}
        <Box flex="1">
          <Text mb="8px" color="gray.300">Marca:</Text>
          <Select
            placeholder="Todas as marcas"
            onChange={(e) => setFiltroMarca(e.target.value)}
            bg="gray.700"
            color="white"
            borderColor="gray.600"
            _hover={{ borderColor: 'red.500' }}
            _focus={{ borderColor: 'red.500', boxShadow: '0 0 0 1px #E53E3E' }}
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
            bg="gray.700"
            color="white"
            borderColor="gray.600"
            _hover={{ borderColor: 'red.500' }}
            _focus={{ borderColor: 'red.500', boxShadow: '0 0 0 1px #E53E3E' }}
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
            value={filtroPrecoMin}
            onChange={(value) => setFiltroPrecoMin(value)}
            min={minPrecoGlobal}
            max={maxPrecoGlobal}
            step={1000}
            flex="1"
          >
            <NumberInputField
              bg="gray.700"
              color="white"
              borderColor="gray.600"
              _focus={{ borderColor: 'red.500', boxShadow: '0 0 0 1px #E53E3E' }}
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
            value={filtroPrecoMax}
            onChange={(value) => setFiltroPrecoMax(value)}
            min={minPrecoGlobal}
            max={maxPrecoGlobal}
            step={1000}
            flex="1"
          >
            <NumberInputField
              bg="gray.700"
              color="white"
              borderColor="gray.600"
              _focus={{ borderColor: 'red.500', boxShadow: '0 0 0 1px #E53E3E' }}
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
          step={100}
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
            <RangeSliderFilledTrack bg="red.500" />
          </RangeSliderTrack>
          <Tooltip
            hasArrow
            bg="red.500"
            color="white"
            placement="top"
            isOpen={showTooltipMin}
            label={formatPrice(currentMinPrice)}
          >
            <RangeSliderThumb index={0} />
          </Tooltip>
          <Tooltip
            hasArrow
            bg="red.500"
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