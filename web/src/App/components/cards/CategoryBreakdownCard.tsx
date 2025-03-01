import { Card } from "@mantine/core";
import { Link } from "@tanstack/react-router";

export function CategoryBreakdownCard() {
  return (
    <Card shadow="md" withBorder>
      <header>
        <em>Category Breakdown</em>
      </header>

      <p style={{ maxWidth: "45ch" }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere et
        reprehenderit autem distinctio provident dolorum dolorem perferendis
        eius. Quos accusamus tempora, eum doloribus aspernatur maxime laborum
        libero cupiditate laboriosam recusandae!
      </p>

      <Link to="/categories">Categories</Link>
    </Card>
  );
}
