import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosService } from 'src/app/pedidos.service';
import { Pedido } from 'src/app/pedido';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {
  pedido: Pedido = {nombre: '', precio: 0 }; 

  constructor(private route: ActivatedRoute, private router: Router, private pedidosService: PedidosService) { }

  ngOnInit() {
    let idPedido = this.route.snapshot.paramMap.get("id");
  
    const idPedidoValido: string | undefined = idPedido?.toString();
  
    this.pedidosService.getPedido(idPedidoValido).subscribe((pedidos: Pedido[]) => {
      if (pedidos && pedidos.length > 0) {
        this.pedido = pedidos[0];
      }
    });
  }
  

  volver() {
    this.router.navigate(['/menu']);
  }

  onSubmit() {
    console.log('Pedido a actualizar desde el componente:', this.pedido);
    if (this.pedido && this.pedido.id) {
      // Crear un nuevo objeto con el id y los demás campos del pedido
      const pedidoActualizado = {
        id: this.pedido.id,
        nombre: this.pedido.nombre,
        precio: this.pedido.precio
      };
  
      this.pedidosService.updatePedido(pedidoActualizado).subscribe(() => {
        this.volver();
      });
    }
  }
  

}
