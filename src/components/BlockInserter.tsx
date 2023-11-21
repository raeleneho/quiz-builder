import { useState } from 'react';
import { BlockClient, BlockType } from '../../api/BlockClient';
import { blockLibrary } from './blocks/BlockLibrary';
import { Button, Flex, HStack } from '@chakra-ui/react';

interface BlockInserterProps {
  position: number;
  quizId: string;
  stepId: string;
}

export const BlockInserter = ({ position, stepId, quizId }: BlockInserterProps) => {
  const addBlock = (blockType: BlockType) => {
    const newBlock = {
      quizId,
      stepId,
      type: blockType,
      position: position,
      data: blockLibrary[blockType].factory(),
    };

    BlockClient.createBlock(newBlock);
  };

  return (
    <Flex justify="space-around" p={2}>
      <Button aria-label="select input block" onClick={() => addBlock(BlockType.INPUT)}>
        {blockLibrary[BlockType.INPUT].inserterOptions.label}
      </Button>
      <Button aria-label="select textarea block" onClick={() => addBlock(BlockType.TEXTAREA)}>
        {blockLibrary[BlockType.TEXTAREA].inserterOptions.label}
      </Button>
    </Flex>
  );
};
