<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ToDoItemRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\ToDoItemReorderController;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;

#[ORM\Entity(repositoryClass: ToDoItemRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Put(),
        new Patch(),
        new Delete(),
        new Post(
            uriTemplate: '/to_do_items/reorder',
            controller: ToDoItemReorderController::class,
            name: 'to_do_items_reorder',
            defaults: ['_api_receive' => false],
            extraProperties: [
                'standard_put' => true,
                'openapi' => [
                    'summary' => 'Reorder tasks',
                    'description' => 'Zmienia pozycje wielu zadań naraz (drag & drop).',
                    'requestBody' => [
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'array',
                                    'items' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'id' => ['type' => 'integer'],
                                            'positionOnList' => ['type' => 'integer'],
                                        ],
                                        'required' => ['id', 'positionOnList'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ]
            ]
        )
    ]
)]
class ToDoItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    private ?string $name = null;

    #[ORM\Column]
    private ?\DateTime $creation_date = null;

    #[ORM\Column]
    private ?\DateTime $edit_date = null;

    #[ORM\Column]
    private ?int $position_on_list = null;

    public function __construct()
    {
        $now = new \DateTime();
        $this->creation_date = $now;
        $this->edit_date = $now;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCreationDate(): ?\DateTime
    {
        return $this->creation_date;
    }

    public function setCreationDate(\DateTime $creation_date): static
    {
        $this->creation_date = $creation_date;

        return $this;
    }

    public function getEditDate(): ?\DateTime
    {
        return $this->edit_date;
    }

    public function setEditDate(\DateTime $edit_date): static
    {
        $this->edit_date = $edit_date;

        return $this;
    }

    public function getPositionOnList(): ?int
    {
        return $this->position_on_list;
    }

    public function setPositionOnList(int $position_on_list): static
    {
        $this->position_on_list = $position_on_list;

        return $this;
    }

    #[ORM\PreUpdate]
    public function updateEditDate(): void
    {
        $this->edit_date = new \DateTime();
    }
}
