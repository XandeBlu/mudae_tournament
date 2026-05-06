import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";
import TertiaryButton from "../buttons/TertiaryButton";

export default function BattleScreen() {
  return (
    <div className="bg-[#0d1117]">
      <Row justify={"space-between"}>
        <Col span={4}>
          <SecondaryButton>← Voltar</SecondaryButton>
        </Col>
        <div className="flex justify-center w-1/3 gap-10">
          <Col span={4}>
            <PrimaryButton>Desfazer</PrimaryButton>
          </Col>
          <Col span={4}>
            <PrimaryButton>Reiniciar</PrimaryButton>
          </Col>
        </div>
      </Row>
      <Row>
        <Col>
          <TertiaryButton>+</TertiaryButton>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </div>
  );
}
