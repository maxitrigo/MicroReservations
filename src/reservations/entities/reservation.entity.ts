import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Resources } from "../../resources/entities/resource.entity";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4()

    @Column()
    date: string

    @Column()
    time: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column('uuid')
    userId: string

    @ManyToOne( () => Resources, (resource) => resource.reservations )
    @JoinColumn({ name: 'resourceId' })
    resource: Resources

}
