<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\ToDoItem;

#[AsController]
class ToDoItemReorderController
{
    public function __construct(private EntityManagerInterface $em) {}

    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            return new JsonResponse(['error' => 'Invalid payload'], 400);
        }

        foreach ($data as $item) {
            if (!isset($item['id'], $item['positionOnList'])) {
                continue;
            }

            $task = $this->em->getRepository(ToDoItem::class)->find($item['id']);
            if ($task) {
                $task->setPositionOnList($item['positionOnList']);
            }
        }

        $this->em->flush();

        return new JsonResponse(['success' => true]);
    }
}
