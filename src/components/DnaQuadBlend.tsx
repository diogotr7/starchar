import {
  useMantineTheme,
  Stack,
  Flex,
  Box,
  NumberInput,
  Text,
} from "@mantine/core";
import { useCallback, useRef, useState, useEffect } from "react";
import { DraggableEvent, DraggableCore } from "react-draggable";
import { blendTotal, FacePart } from "../schema/Dna";
import { useChfStore, useChf } from "../useChfStore";
import { getCoords } from "../utils/coords";

function locationFromFacePart(parts: [number, number, number, number]): {
  left: number;
  top: number;
} {
  parts = parts.map((p) => p / blendTotal) as [number, number, number, number];

  // Corner positions (clockwise from top-left)
  const cornerPositions = [
    { left: 0, top: 0 }, // Top-left
    { left: 1, top: 0 }, // Top-right
    { left: 1, top: 1 }, // Bottom-right
    { left: 0, top: 1 }, // Bottom-left
  ];

  // Calculate weighted average of corner positions
  let left = 0;
  let top = 0;

  for (let i = 0; i < 4; i++) {
    left += cornerPositions[i].left * parts[i];
    top += cornerPositions[i].top * parts[i];
  }

  return { left, top };
}

function facePartFromLocation(
  left: number,
  top: number
): [number, number, number, number] {
  if (left > 1 || left < 0 || top > 1 || top < 0) {
    throw new Error("Coordinates out of bounds");
  }
  // Ensure coordinates are within bounds
  left = Math.max(0, Math.min(1, left));
  top = Math.max(0, Math.min(1, top));

  // Calculate blend weights using bilinear interpolation
  // Order: Top-left, Top-right, Bottom-right, Bottom-left
  const w1 = (1 - left) * (1 - top); // Top-left
  const w2 = left * (1 - top); // Top-right
  const w3 = left * top; // Bottom-right
  const w4 = (1 - left) * top; // Bottom-left

  // These weights should already sum to 1, but normalize to be safe
  const sum = w1 + w2 + w3 + w4;

  return [
    Math.round((w1 / sum) * blendTotal),
    Math.round((w2 / sum) * blendTotal),
    Math.round((w3 / sum) * blendTotal),
    Math.round((w4 / sum) * blendTotal),
  ];
}

function BlendDisplay({ value }: { value: number }) {
  return (
    <Text w="2em" size="xs">
      {Math.round((value / blendTotal) * 100)}%
    </Text>
  );
}

function HeadIdPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <NumberInput
      w="3em"
      allowDecimal={false}
      allowLeadingZeros={false}
      inputMode="numeric"
      allowNegative={false}
      size="xs"
      value={value}
      onChange={(value) => onChange(typeof value === "number" ? value : 0)}
      min={0}
      max={255} //TODO
      step={1}
    />
  );
}

export interface DnaQuadBlendProps {
  facePart: FacePart;
}

export function DnaQuadBlend({ facePart }: DnaQuadBlendProps) {
  const updateChf = useChfStore((c) => c.updateChf);
  const part = useChf((c) => c.dna.face_parts[facePart]);
  const theme = useMantineTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState(() =>
    locationFromFacePart(
      part.map((p) => p.value) as [number, number, number, number]
    )
  );

  // Step size for keyboard navigation (in percentage)
  const STEP_SIZE = 0.05;

  useEffect(() => {
    setLocation(
      locationFromFacePart(
        part.map((p) => p.value) as [number, number, number, number]
      )
    );
  }, [part]);

  const updateLocation = useCallback(
    (newLocation: { left: number; top: number }) => {
      // Ensure coordinates are within bounds
      const boundedLocation = {
        left: Math.max(0, Math.min(1, newLocation.left)),
        top: Math.max(0, Math.min(1, newLocation.top)),
      };

      setLocation(boundedLocation);
      const newParts = facePartFromLocation(
        boundedLocation.left,
        boundedLocation.top
      );

      updateChf((draft) => {
        draft.dna.face_parts[facePart] = draft.dna.face_parts[facePart].map(
          (p, i) => {
            return {
              ...p,
              value: newParts[i],
            };
          }
        );
      });
    },
    [updateChf, facePart]
  );

  const updateHue = useCallback(
    (e: DraggableEvent) => {
      if (!containerRef.current) return;

      const bounding = containerRef.current.getBoundingClientRect();
      const { x, y } = getCoords(e);
      const dx = x - bounding.left;
      const dy = y - bounding.top;
      const width = bounding.width;
      const height = bounding.height;
      const xPercent = Math.min(Math.max(dx / width, 0), 1);
      const yPercent = Math.min(Math.max(dy / height, 0), 1);

      updateLocation({ left: xPercent, top: yPercent });
    },
    [updateLocation]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Prevent default to avoid scrolling the page
      e.preventDefault();

      let newLocation = { ...location };

      switch (e.key) {
        case "ArrowUp":
          newLocation.top = Math.max(
            0,
            location.top - (e.shiftKey ? STEP_SIZE / 5 : STEP_SIZE)
          );
          break;
        case "ArrowDown":
          newLocation.top = Math.min(
            1,
            location.top + (e.shiftKey ? STEP_SIZE / 5 : STEP_SIZE)
          );
          break;
        case "ArrowLeft":
          newLocation.left = Math.max(
            0,
            location.left - (e.shiftKey ? STEP_SIZE / 5 : STEP_SIZE)
          );
          break;
        case "ArrowRight":
          newLocation.left = Math.min(
            1,
            location.left + (e.shiftKey ? STEP_SIZE / 5 : STEP_SIZE)
          );
          break;
        case "Home":
          // Jump to top-left corner
          newLocation = { left: 0, top: 0 };
          break;
        case "End":
          // Jump to bottom-right corner
          newLocation = { left: 1, top: 1 };
          break;
        case "PageUp":
          // Jump to top-right corner
          newLocation = { left: 1, top: 0 };
          break;
        case "PageDown":
          // Jump to bottom-left corner
          newLocation = { left: 0, top: 1 };
          break;
        case "5":
        case "c":
        case "C":
          // Center point when 5 or c is pressed (like numpad 5 centered)
          newLocation = { left: 0.5, top: 0.5 };
          break;
        default:
          return; // Exit if it's not a key we handle
      }

      updateLocation(newLocation);
    },
    [location, updateLocation]
  );

  const updateHeadId = useCallback(
    (index: number, value: number) => {
      updateChf((draft) => {
        draft.dna.face_parts[facePart][index].head_id = value;
      });
    },
    [updateChf, facePart]
  );

  return (
    <Stack w="10em" p={0} gap="md">
      <Flex gap="0" align="center" justify="space-between">
        <HeadIdPicker
          value={part[0].head_id}
          onChange={(value) => updateHeadId(0, value)}
        />
        <BlendDisplay value={part[0].value} />
        <BlendDisplay value={part[1].value} />
        <HeadIdPicker
          value={part[1].head_id}
          onChange={(value) => updateHeadId(1, value)}
        />
      </Flex>

      <DraggableCore
        nodeRef={containerRef}
        onDrag={updateHue}
        onMouseDown={updateHue}
      >
        <Box
          ref={containerRef}
          w="100%"
          style={{
            aspectRatio: "1/1",
            position: "relative",
            border: `1px solid ${theme.colors.dark[4]}`,
          }}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label={`${facePart} blend control. Use arrow keys to adjust the blend.`}
          aria-valuetext={`Left: ${Math.round(
            location.left * 100
          )}%, Top: ${Math.round(location.top * 100)}%`}
          role="slider"
          aria-roledescription="2D blend slider"
        >
          {/* SVG for center and edge indicators */}
          <svg
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
          >
            {/* Center crosshair */}
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke={theme.colors.gray[6]}
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke={theme.colors.gray[6]}
              strokeWidth="1"
              strokeDasharray="3,3"
            />

            {/* Edge midpoints - small ticks */}
            <line
              x1="0"
              y1="50%"
              x2="5%"
              y2="50%"
              stroke={theme.colors.gray[6]}
              strokeWidth="1"
            />
            <line
              x1="95%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke={theme.colors.gray[6]}
              strokeWidth="1"
            />
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="5%"
              stroke={theme.colors.gray[6]}
              strokeWidth="1"
            />
            <line
              x1="50%"
              y1="95%"
              x2="50%"
              y2="100%"
              stroke={theme.colors.gray[6]}
              strokeWidth="1"
            />
          </svg>
          <Box
            top={location.top * 100 + "%"}
            left={location.left * 100 + "%"}
            w="8px"
            h="8px"
            bg={theme.colors.blue[5]}
            style={{
              transform: "translate(-50%, -50%)",
              position: "absolute",
              pointerEvents: "none",
              borderRadius: "50%",
            }}
          />
        </Box>
      </DraggableCore>

      <Flex gap="0" align="center" justify="space-between">
        <HeadIdPicker
          value={part[3].head_id}
          onChange={(value) => updateHeadId(3, value)}
        />
        <BlendDisplay value={part[3].value} />
        <BlendDisplay value={part[2].value} />
        <HeadIdPicker
          value={part[2].head_id}
          onChange={(value) => updateHeadId(2, value)}
        />
      </Flex>
    </Stack>
  );
}
