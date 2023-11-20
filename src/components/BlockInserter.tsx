import { useState } from "react";
import { BlockClient, BlockType } from "../../api/BlockClient";
import { blockLibrary } from "./blocks/BlockLibrary";

interface BlockInserterProps {
  position: number;
  quizId: string;
  stepId: string;
}

export const BlockInserter = ({
  position,
  stepId,
  quizId,
}: BlockInserterProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    <>
      <div className="inserter">
        {/* <div
          className="inserter-icon"
          onClick={() => setModalIsOpen(!modalIsOpen)}
        /> */}
      </div>
      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setModalIsOpen(false)}>x</button>
            <button onClick={() => addBlock(BlockType.INPUT)}>
              {blockLibrary[BlockType.INPUT].inserterOptions.label}
            </button>
            <button onClick={() => addBlock(BlockType.TEXTAREA)}>
              {blockLibrary[BlockType.TEXTAREA].inserterOptions.label}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
